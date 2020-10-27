import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { useRecentSearches, useMediaTags } from '@micromag/data'; // useOrganisationTeam
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import DropdownSection from './DropdownSection';
import SearchFilters from './SearchFilters';
import SearchForm from '../forms/Search';
import ActiveFilters from './ActiveFilters';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/navbar.module.scss';

const propTypes = {
    filters: AppPropTypes.filtersValue,
    media: MicromagPropTypes.media,
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
    className,
    onClickAdd,
    onClickCancel,
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) => {
    const [open, setOpen] = useState(false);
    const { recent } = useRecentSearches();
    const { tags } = useMediaTags();
    // const { team } = useOrganisationTeam();

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

    const sources = [
        {
            label: (
                <FormattedMessage
                    defaultMessage="All sources"
                    description="Source from all places"
                />
            ),
            value: 'all',
        },
        {
            label: (
                <FormattedMessage
                    defaultMessage="This Micromag"
                    description="Source from this micromag"
                />
            ),
            value: 'self',
        },
        {
            label: (
                <FormattedMessage
                    defaultMessage="Some other micromag"
                    description="Source from another micromag"
                />
            ),
            value: 'some-other-micromag',
        },
    ];

    const team = [
        {
            id: 1,
            label: 'Pierre',
            value: 'pierre',
            thumbnail_url: 'https://picsum.photos/id/2/50/50',
        },
        { id: 2, label: 'Paul', value: 'paul', color: 'blue' },
    ];

    const usage = [
        {
            label: (
                <FormattedMessage
                    defaultMessage="Already used"
                    description="Media has been use somewhere"
                />
            ),
            value: 'unused',
        },
        {
            label: (
                <FormattedMessage
                    defaultMessage="Unused"
                    description="Media has not been used somewhere"
                />
            ),
            value: 'used',
        },
    ];

    const sections = [
        {
            value: 'recent',
            label: (
                <FormattedMessage
                    defaultMessage="Recent searches"
                    description="Label for recent search section"
                />
            ),
            items: recent,
        },
        {
            value: 'tags',
            label: (
                <FormattedMessage
                    defaultMessage="Tags"
                    description="Label for tags search section"
                />
            ),
            items: tags,
        },
        {
            value: 'users',
            label: (
                <FormattedMessage
                    defaultMessage="Added by"
                    description="Label for users search section"
                />
            ),
            items: team,
        },
        {
            value: 'usage',
            label: (
                <FormattedMessage
                    defaultMessage="Usage"
                    description="Label for usage search section"
                />
            ),
            items: usage,
        },
    ];

    const onFilterChange = useCallback(
        (type, value) => {
            const newFiltersValue = {
                ...filters,
                [type]: value,
            };
            if (onFiltersChange !== null) {
                onFiltersChange(newFiltersValue);
            }
            setOpen(false);
        },
        [filters, onFiltersChange, setOpen],
    );

    const onSearchChange = useCallback(
        (newSearchValue) => {
            onFilterChange('search', newSearchValue);
        },
        [onFilterChange],
    );

    const onSourceChange = useCallback(
        (newSourceValue) => {
            onFilterChange('source', newSourceValue);
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
                        {media !== null ? (
                            media.name
                        ) : (
                            <FormattedMessage
                                defaultMessage="Media gallery"
                                description="Top nav title for media gallery"
                            />
                        )}
                    </strong>
                </div>
                {media === null ? (
                    <>
                        <div className="d-flex w-100 flex-nowrap justify-content-center">
                            <DropdownSection
                                items={sources}
                                value={filters.source || null}
                                onChange={onSourceChange}
                            />
                        </div>
                        <div className="d-flex w-100 flex-nowrap justify-content-between">
                            <SearchForm
                                value={searchValue}
                                onChange={onSearchChange}
                                onFocus={onSearchFocus}
                                className={classNames(['form-inline', 'mr-2'])}
                            />
                            <form className={classNames(['form-inline', 'ml-auto'])}>
                                {open || searchValue || hasFilter ? (
                                    <Button
                                        theme="primary"
                                        icon={<FontAwesomeIcon icon={faTimesCircle} />}
                                        onClick={onClear}
                                    >
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
