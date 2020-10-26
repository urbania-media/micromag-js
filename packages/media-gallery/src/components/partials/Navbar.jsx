import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useOrganisationTeam, useRecentSearches, useMediaTags } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import SearchFilters from './SearchFilters';
import SearchForm from '../forms/Search';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/navbar.module.scss';

const propTypes = {
    filters: AppPropTypes.filtersValue,
    media: MicromagPropTypes.media,
    onClickAdd: PropTypes.func,
    onFocusSearch: PropTypes.func,
    onFiltersChange: PropTypes.func,
    onClickBack: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    media: null,
    onClickAdd: null,
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
    onFocusSearch,
    onFiltersChange,
    onClickBack,
}) => {
    const [open, setOpen] = useState(false);
    const { recent } = useRecentSearches();
    const { tags } = useMediaTags();
    // const { team } = useOrganisationTeam();
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
        },
        [filters, onFiltersChange],
    );

    const onSearchChange = useCallback(
        (newSearchValue) => {
            onFilterChange('search', newSearchValue);
        },
        [onFilterChange],
    );

    const onSearchFocus = useCallback(() => {
        if (onFocusSearch !== null) {
            onFocusSearch();
        }
        setOpen(true);
    });

    const searchValue = filters !== null ? filters.search || null : null;

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
                {media !== null ? (
                    <div className="d-flex flex-nowrap justify-content-between">
                        <form className={classNames(['form-inline'])}>
                            <Button
                                theme="secondary"
                                outline
                                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                                onClick={onClickBack}
                            />
                        </form>
                        <strong className="navbar-text ml-2 mr-auto">{media.name}</strong>
                    </div>
                ) : (
                    <div className="d-flex flex-nowrap justify-content-between">
                        <SearchForm
                            value={searchValue}
                            onChange={onSearchChange}
                            onFocus={onSearchFocus}
                            className={classNames(['form-inline', 'mr-2'])}
                        />
                        <form className={classNames(['form-inline', 'ml-auto'])}>
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
                        </form>
                    </div>
                )}
                {open && media === null ? (
                    <div className="d-flex flex-nowrap justify-content-between">
                        <SearchFilters
                            filters={filters}
                            onFilterChange={onFilterChange}
                            sections={sections}
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
