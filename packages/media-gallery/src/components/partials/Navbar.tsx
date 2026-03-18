import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// useOrganisationTeam
import type { Media as MediaType, Tag } from '@micromag/core';
import { Button, Media } from '@micromag/core/components';
import { useMediasRecentSearches } from '@micromag/data';

import { useSearchFilters } from '../../hooks/useSearchFilters';

import DropdownSection from '../forms/DropdownSection';
import SearchForm from '../forms/Search';
import SearchFilters from '../forms/SearchFilters';
import ActiveFilters from './ActiveFilters';

import styles from '../../styles/partials/navbar.module.css';

const emptyArray: never[] = [];

interface NavbarProps {
    types?: string[];
    filters?: unknown;
    media?: MediaType;
    selectedMedia?: MediaType;
    storyId?: string | number;
    tags?: Tag[];
    authors?: { name?: string }[];
    loading?: boolean;
    withoutSource?: boolean;
    withoutType?: boolean;
    onClickAdd?: (...args: unknown[]) => void;
    onClickItem?: (...args: unknown[]) => void;
    onClickItemInfo?: (...args: unknown[]) => void;
    onClickClear?: (...args: unknown[]) => void;
    onFocusSearch?: (...args: unknown[]) => void;
    onFiltersChange?: (...args: unknown[]) => void;
    onClickBack?: (...args: unknown[]) => void;
    className?: string;
}

function Navbar({
    types = null,
    filters = null,
    media = null,
    selectedMedia = null,
    storyId = null,
    tags = emptyArray,
    authors = emptyArray,
    loading = false,
    withoutSource = false,
    withoutType = true,
    className = null,
    onClickAdd = null,
    onClickItem = null,
    onClickItemInfo = null,
    onClickClear = null,
    onFocusSearch = null,
    onFiltersChange = null,
    onClickBack = null,
}: NavbarProps) {
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

    const onClickRemove = useCallback(() => {
        if (onClickClear !== null) {
            onClickClear();
        } else if (onClickItem !== null) {
            onClickItem(null);
        }
    }, [onClickClear, onClickItem]);

    const uploadMessage = useMemo(() => {
        let message = (
            <FormattedMessage
                defaultMessage="Upload a media"
                description="Upload button label in Media Gallery"
            />
        );
        if (types !== null) {
            if (types.indexOf('video') !== -1 && types.indexOf('image') !== -1) {
                message = (
                    <FormattedMessage
                        defaultMessage="Upload a visual file"
                        description="Upload button label in Media Gallery"
                    />
                );
            } else if (types.indexOf('video') !== -1) {
                message = (
                    <FormattedMessage
                        defaultMessage="Upload a video file"
                        description="Upload button label in Media Gallery"
                    />
                );
            } else if (types.indexOf('image') !== -1) {
                message = (
                    <FormattedMessage
                        defaultMessage="Upload an image file"
                        description="Upload button label in Media Gallery"
                    />
                );
            } else if (types.indexOf('audio') !== -1) {
                message = (
                    <FormattedMessage
                        defaultMessage="Upload an audio file"
                        description="Upload button label in Media Gallery"
                    />
                );
            } else if (types.indexOf('subtitle') !== -1) {
                message = (
                    <FormattedMessage
                        defaultMessage="Upload a closed captions file"
                        description="Upload button label in Media Gallery"
                    />
                );
            }
        }
        return message;
    }, [types]);

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
                    <div
                        className={classNames([
                            'list-group-item rounded w-100 mw-100 navbar-text mb-2',
                            { 'border border-primary bg-dark py-2 px-2': selectedMedia !== null },
                        ])}
                    >
                        {selectedMedia !== null ? (
                            <div className="">
                                <div className="d-flex align-items-center mb-2 overflow-hidden">
                                    <Media
                                        className={styles.mediaPreview}
                                        thumbnailClassName={styles.thumbnail}
                                        thumbnail={selectedMedia?.thumbnail_url}
                                        thumbnailAlign="center"
                                    />
                                    <span
                                        className={classNames([
                                            styles.mediaLabel,
                                            'd-inline-block',
                                            'text-break',
                                            'mx-1',
                                            'me-2',
                                        ])}
                                    >
                                        {selectedMedia.name || (
                                            <FormattedMessage
                                                defaultMessage="[no title]"
                                                description="No title label in Media Gallery"
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className="d-flex w-100 align-content-center justify-content-between">
                                    <Button
                                        onClick={() => onClickItemInfo(selectedMedia)}
                                        theme="secondary"
                                        size="sm"
                                        iconPosition="right"
                                        icon={<FontAwesomeIcon icon={faInfoCircle} />}
                                        outline
                                    >
                                        <FormattedMessage
                                            defaultMessage="Edit"
                                            description="Button label in Media Gallery"
                                        />
                                    </Button>
                                    <Button
                                        theme="secondary"
                                        size="sm"
                                        outline
                                        iconPosition="right"
                                        icon={<FontAwesomeIcon icon={faTimes} />}
                                        onClick={onClickRemove}
                                        title={intl.formatMessage({
                                            defaultMessage: 'Remove',
                                            description: 'Remove button label in Media Gallery',
                                        })}
                                    >
                                        <FormattedMessage
                                            defaultMessage="Remove"
                                            description="Button label in Media Gallery"
                                        />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                className="w-100"
                                theme="primary"
                                icon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={onClickAdd}
                                title={intl.formatMessage({
                                    defaultMessage: 'Add',
                                    description: 'Add button label in Media Gallery',
                                })}
                            >
                                <span className="ps-2">{uploadMessage}</span>
                            </Button>
                        )}
                    </div>
                ) : null}

                {!withoutSource && media === null && sources !== null && sources.length > 1 ? (
                    <div className="mb-2 d-flex w-100 align-items-center flex-nowrap">
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
                        <strong className="navbar-text me-auto w-100 text-truncate text-light">
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
                                loading={loading}
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

export default Navbar;
