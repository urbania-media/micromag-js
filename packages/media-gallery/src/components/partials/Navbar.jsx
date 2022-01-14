import { faChevronLeft, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// useOrganisationTeam
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Media } from '@micromag/core/components';
import { useMediasRecentSearches } from '@micromag/data';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
    // onClickCancel: null,
    onFocusSearch: null,
    onFiltersChange: null,
    onClickBack: null,
    className: null,
};

const Navbar = ({
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
    // onClickCancel,
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) => {
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
        setOpen(true);
    });

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
            <div className={styles.inner}>
                <strong className="list-group-item rounded py-1 px-1 navbar-text d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        {selectedMedia !== null ? (
                            <>
                                <Media
                                    className={styles.mediaPreview}
                                    thumbnail={selectedMedia?.thumbnail_url}
                                />
                                <span className="ml-2">{selectedMedia.name || 'untitled'}</span>
                            </>
                        ) : (
                            <FormattedMessage
                                defaultMessage="Upload a new image"
                                description="Upload button label in Media Gallery"
                            />
                        )}
                    </div>

                    {selectedMedia === null ? (
                        <Button
                            theme="primary"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={onClickAdd}
                            title={ intl.formatMessage({
                                defaultMessage: 'Add',
                                description: 'Add button label in Media Gallery'
                            })}
                        />
                    ) : (
                        <Button
                            theme="primary"
                            icon={<FontAwesomeIcon icon={faTimes} />}
                            onClick={() => onClickItem(selectedMedia)}
                            title={intl.formatMessage({
                                defaultMessage: 'Remove',
                                description: 'Remove button label in Media Gallery'
                            })}
                        />
                    )}
                </strong>

                {!withoutSource ? (
                    <div className="py-2 d-flex w-100 flex-nowrap">
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
                    <strong className="navbar-text mr-auto w-100">
                        {media !== null ? media.name : null}
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
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
