import React, { useCallback, useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import isArray from 'lodash/isArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useMediasRecentSearches, useMediaTags } from '@micromag/data';
// useOrganisationTeam
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import DropdownSection from '../forms/DropdownSection';
import SearchFilters from '../forms/SearchFilters';
import SearchForm from '../forms/Search';
import ActiveFilters from './ActiveFilters';

import useSearchFilters from '../../hooks/useSearchFilters';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/navbar.module.scss';

const propTypes = {
    filters: AppPropTypes.filtersValue,
    media: MicromagPropTypes.media,
    withoutTitle: PropTypes.bool,
    withoutSource: PropTypes.bool,
    withoutType: PropTypes.bool,
    onClickAdd: PropTypes.func,
    onClickCancel: PropTypes.func,
    onFocusSearch: PropTypes.func,
    onFiltersChange: PropTypes.func,
    onClickBack: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    media: null,
    withoutTitle: false,
    withoutSource: false,
    withoutType: true,
    onClickAdd: null,
    onClickCancel: null,
    onFocusSearch: null,
    onFiltersChange: null,
    onClickBack: null,
    className: null,
};

const Navbar = ({
    filters,
    media,
    withoutTitle,
    withoutSource,
    withoutType,
    className,
    onClickAdd,
    onClickCancel,
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) => {
    const throttle = useRef(null);
    const [open, setOpen] = useState(false);

    // TODO: get data from api for real testing

    const { getSearches, createSearch } = useMediasRecentSearches();
    const recent = useMemo(() => getSearches(), [getSearches]);

    const { tags = [] } = useMediaTags();
    // const { team } = useOrganisationTeam();
    const team = [];
    const { sources, sections } = useSearchFilters({
        recent: recent.map((val) => ({ value: val, label: val })),
        tags: tags !== null ? tags.map((t) => ({ value: t.name, label: t.name })) : [],
        team,
        withType: !withoutType,
    });

    const searchValue = filters !== null ? filters.search || null : null;

    const hasFilter =
        filters !== null
            ? Object.keys(filters).reduce((acc, val) => {
                  if (
                      val !== 'type' &&
                      val !== 'search' &&
                      val !== 'source' &&
                      filters[val] !== null &&
                      filters[val].length > 0
                  ) {
                      return true;
                  }
                  return acc;
              }, false)
            : false;

    const onFilterChange = useCallback(
        (type, value, isOpen = false) => {
            const newFiltersValue = {
                ...filters,
                [type]: value,
            };
            if (onFiltersChange !== null) {
                onFiltersChange(newFiltersValue);
            }
            setOpen(isOpen);
        },
        [filters, onFiltersChange, setOpen],
    );

    const onFiltersReset = useCallback(() => {
        onFiltersChange({
            type: filters.type || null,
            search: filters.search || null,
            source: filters.source || null,
        });
        setOpen(false);
    }, [filters, onFiltersChange]);

    const onSearchChange = useCallback(
        (value) => {
            if (throttle.current !== null) {
                clearTimeout(throttle.current);
            }
            throttle.current = setTimeout(() => {
                createSearch(value);
                throttle.current = null;
            }, 5000);
            onFilterChange('search', value, !!value);
            setOpen(false);
        },
        [onFilterChange, createSearch, setOpen, throttle],
    );

    const onSourceChange = useCallback(
        (value) => {
            onFilterChange('source', value);
        },
        [onFilterChange],
    );

    const onSearchFocus = useCallback(() => {
        if (onFocusSearch !== null) {
            onFocusSearch();
        }
        setOpen(true);
    });

    const onClear = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onToggleMenu = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    const title = !withoutTitle ? (
        <FormattedMessage
            defaultMessage="Media gallery"
            description="Top nav title for media gallery"
        />
    ) : null;

    return (
        <nav
            className={classNames([
                styles.container,
                'navbar',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                {!withoutSource && media === null ? (
                    <div className="d-flex w-100 flex-nowrap justify-content-center">
                        <DropdownSection
                            items={sources}
                            value={filters.source || null}
                            onChange={onSourceChange}
                        />
                    </div>
                ) : null}

                <div className="w-100 d-flex flex-nowrap justify-content-between">
                    {media !== null ? (
                        <form className={classNames(['form-inline', 'mr-2'])}>
                            <Button
                                theme="secondary"
                                outline
                                size="sm"
                                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                                onClick={onClickBack}
                            />
                        </form>
                    ) : null}
                    <strong className="navbar-text mr-auto w-100 d-flex align-items-center justify-content-between">
                        {media !== null ? media.name : title}
                        {media === null ? (
                            <Button
                                theme="primary"
                                icon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={onClickAdd}
                            >
                                <FormattedMessage
                                    defaultMessage="Add"
                                    description="Add button label in Media Gallery"
                                />
                            </Button>
                        ): null}
                    </strong>
                </div>
                {media === null ? (
                    <>
                        <div className="d-flex w-100 flex-nowrap justify-content-between">
                            <SearchForm
                                value={searchValue}
                                onChange={onSearchChange}
                                onFocus={onSearchFocus}
                                onClickIcon={onToggleMenu}
                                className={classNames(['form-inline'])}
                            />
                            <form className={classNames(['form-inline'])}>
                                {open ? (
                                    <Button
                                        className="ml-2"
                                        theme="primary"
                                        icon={<FontAwesomeIcon icon={faTimes} />}
                                        onClick={onClear}>
                                        {/* <FormattedMessage
                                            defaultMessage="Cancel"
                                            description="Cancel button label in Media Gallery"
                                        /> */}
                                    </Button>
                                ) : null}
                            </form>
                        </div>
                        {open ? (
                            <div className="d-flex w-100 my-1 flex-nowrap justify-content-between">
                                <SearchFilters
                                    filters={filters}
                                    sections={sections}
                                    onChange={onFilterChange}
                                />
                            </div>
                        ) : null}
                    </>
                ) : null}
                {hasFilter && !open && media === null ? (
                    <div className="d-flex w-100 my-1 flex-nowrap justify-content-between">
                        <ActiveFilters
                            filters={filters}
                            sections={sections}
                            onChange={onFilterChange}
                            onReset={onFiltersReset}
                        />
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
