import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useRecentSearches, useMediaTags } from '@micromag/data'; // useOrganisationTeam
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
    className,
    onClickAdd,
    onClickCancel,
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) => {
    const [open, setOpen] = useState(false);

    // TODO: get data from api for real testing

    const { recent } = useRecentSearches();
    const { tags } = useMediaTags();
    // const { team } = useOrganisationTeam();
    const { sources, sections } = useSearchFilters({ recent, tags });

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

    const onSearchChange = useCallback(
        (value) => {
            onFilterChange('search', value, !!value);
        },
        [onFilterChange],
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
        if (onClickCancel !== null) {
            onClickCancel();
        }
        setOpen(false);
    }, [onClickCancel]);

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
                'navbar-light',
                'bg-light',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                <div className="d-flex flex-nowrap justify-content-between">
                    {media !== null ? (
                        <form className={classNames(['form-inline'])}>
                            <Button
                                theme="secondary"
                                outline
                                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                                onClick={onClickBack}
                            />
                        </form>
                    ) : null}
                    <strong className="navbar-text ml-2 mr-auto">
                        {media !== null ? media.name : title}
                    </strong>
                </div>
                {media === null ? (
                    <>
                        {!withoutSource ? (
                            <div className="d-flex w-100 flex-nowrap justify-content-center">
                                <DropdownSection
                                    items={sources}
                                    value={filters.source || null}
                                    onChange={onSourceChange}
                                />
                            </div>
                        ) : null}
                        <div className="d-flex w-100 flex-nowrap justify-content-between">
                            <SearchForm
                                value={searchValue}
                                onChange={onSearchChange}
                                onFocus={onSearchFocus}
                                className={classNames(['form-inline', 'mr-2'])}
                            />
                            <form className={classNames(['form-inline', 'ml-auto'])}>
                                {open || searchValue || hasFilter ? (
                                    <Button theme="primary" outline onClick={onClear}>
                                        {searchValue || hasFilter ? (
                                            <FormattedMessage
                                                defaultMessage="Clear"
                                                description="Clear button label in Media Gallery"
                                            />
                                        ) : (
                                            <FormattedMessage
                                                defaultMessage="Cancel"
                                                description="Cancel button label in Media Gallery"
                                            />
                                        )}
                                    </Button>
                                ) : (
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
                                )}
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
