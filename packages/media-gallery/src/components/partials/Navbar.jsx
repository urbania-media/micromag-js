import { faChevronLeft, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
// useOrganisationTeam
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Media } from '@micromag/core/components';
import { useMediasRecentSearches } from '@micromag/data';
import { useSearchFilters } from '../../hooks/useSearchFilters';
import * as AppPropTypes from '../../lib/PropTypes';
import styles from '../../styles/partials/navbar.module.scss';
import DropdownSection from '../forms/DropdownSection';
import SearchForm from '../forms/Search';
import SearchFilters from '../forms/SearchFilters';
import ActiveFilters from './ActiveFilters';

const propTypes = {
    filters: AppPropTypes.filtersValue,
    media: MicromagPropTypes.media,
    selectedMedia: MicromagPropTypes.media,
    storyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tags: MicromagPropTypes.tags,
    authors: MicromagPropTypes.authors,
    withoutSource: PropTypes.bool,
    withoutType: PropTypes.bool,
    onClickAdd: PropTypes.func,
    onClickItem: PropTypes.func,
    onClickItemInfo: PropTypes.func,
    // onClickCancel: PropTypes.func, // TODO: still needed?
    onFocusSearch: PropTypes.func,
    onFiltersChange: PropTypes.func,
    onClickBack: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    media: null,
    selectedMedia: null,
    storyId: null,
    tags: [],
    authors: [],
    withoutSource: false,
    withoutType: true,
    onClickAdd: null,
    onClickItem: null,
    onClickItemInfo: null,
    // onClickCancel: null,
    onFocusSearch: null,
    onFiltersChange: null,
    onClickBack: null,
    className: null,
};

function Navbar({
    filters,
    media,
    selectedMedia,
    storyId,
    tags,
    authors,
    withoutSource,
    withoutType,
    className,
    onClickAdd,
    onClickItem,
    onClickItemInfo,
    // onClickCancel,
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) {
    const intl = useIntl();
    const throttle = useRef(null);
    const [open, setOpen] = useState(false);

    // TODO: get data from api for real testing

    const { getSearches, createSearch } = useMediasRecentSearches();
    const recent = useMemo(() => getSearches(), [getSearches]);

    const { sources, sections } = useSearchFilters({
        recent: recent.map((val) => ({ value: val, label: val })),
        tags: tags !== null ? tags.map((t) => ({ value: t.name, label: t.name })) : [],
        team: authors || [],
        withType: !withoutType,
        storyId,
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
    }, [onFocusSearch]);

    const onCloseFilters = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onToggleMenu = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

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
            <div className={classNames([styles.inner])}>
                {media === null ? (
                    <div className="list-group-item rounded w-100 mw-100 py-1 px-1 navbar-text d-flex align-items-center justify-content-between">
                        {selectedMedia !== null ? (
                            <Button
                                className={classNames([
                                    styles.mediaLabel,
                                    'd-flex px-0 py-0 align-items-center',
                                ])}
                                onClick={() => onClickItemInfo(selectedMedia)}
                            >
                                <Media
                                    className={styles.mediaPreview}
                                    thumbnail={selectedMedia?.thumbnail_url}
                                />
                                <span
                                    className={classNames([
                                        styles.mediaLabel,
                                        'd-inline-block',
                                        'text-truncate',
                                    ])}
                                >
                                    {selectedMedia.name || (
                                        <FormattedMessage
                                            defaultMessage="[no title]"
                                            description="No title label in Media Gallery"
                                        />
                                    )}
                                </span>
                            </Button>
                        ) : (
                            <span className="ps-2">
                                <FormattedMessage
                                    defaultMessage="Upload an image"
                                    description="Upload button label in Media Gallery"
                                />
                            </span>
                        )}
                        {selectedMedia === null ? (
                            <Button
                                theme="primary"
                                icon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={onClickAdd}
                                title={intl.formatMessage({
                                    defaultMessage: 'Add',
                                    description: 'Add button label in Media Gallery',
                                })}
                            />
                        ) : (
                            <Button
                                theme="primary"
                                icon={<FontAwesomeIcon icon={faTimes} />}
                                onClick={() => onClickItem(selectedMedia)}
                                title={intl.formatMessage({
                                    defaultMessage: 'Remove',
                                    description: 'Remove button label in Media Gallery',
                                })}
                            />
                        )}
                    </div>
                ) : null}

                {!withoutSource && media === null ? (
                    <div className="mt-1 py-2 d-flex w-100 align-items-center flex-nowrap">
                        <DropdownSection
                            items={sources}
                            value={filters.source || null}
                            onChange={onSourceChange}
                        />
                    </div>
                ) : null}

                {media !== null ? (
                    <div className="w-100 d-flex flex-nowrap justify-content-between">
                        <form className={classNames(['d-flex', 'me-2'])}>
                            <Button
                                theme="secondary"
                                outline
                                size="sm"
                                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                                onClick={onClickBack}
                            />
                        </form>
                        <strong className="navbar-text me-auto w-100 text-truncate">
                            {media !== null ? media.name : null}
                        </strong>
                    </div>
                ) : null}

                {media === null ? (
                    <>
                        <div className="d-flex w-100 flex-nowrap justify-content-between">
                            <SearchForm
                                value={searchValue}
                                onChange={onSearchChange}
                                onFocus={onSearchFocus}
                                onClickIcon={onToggleMenu}
                                className={classNames(['d-flex'])}
                            />
                        </div>
                        {open ? (
                            <div className="d-flex w-100 my-1 flex-nowrap justify-content-between">
                                <SearchFilters
                                    filters={filters}
                                    sections={sections}
                                    onChange={onFilterChange}
                                    onClose={onCloseFilters}
                                />
                            </div>
                        ) : null}
                    </>
                ) : null}

                {hasFilter && !open && media === null ? (
                    <div className="list-group-item py-2 px-2 d-flex w-100 my-2 flex-nowrap justify-content-between">
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
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
