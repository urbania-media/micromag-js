/* eslint-disable react/no-array-index-key */

import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { injectIntl, defineMessages } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core';
// import * as AppPropTypes from '../../PropTypes';

import styles from '../../styles/forms/search.module.scss';

import SearchFilters from './SearchFilters';
import ActiveFilters from '../partials/ActiveFilters';

const messages = defineMessages({
    placeholder: {
        id: 'forms.search.search_placeholder',
        defaultMessage: 'Search...',
    },
});

// @TODO check how to use AppPropTypes

const propTypes = {
    intl: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        formatMessage: PropTypes.func.isRequired,
    }),
    value: PropTypes.shape({
        search: PropTypes.string,
        types: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        users: PropTypes.arrayOf(PropTypes.string),
        usage: PropTypes.arrayOf(PropTypes.oneOf(['used', 'unused'])),
    }),
    onChange: PropTypes.func,
    onFiltersOpened: PropTypes.func.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    intl: null,
    value: null,
    onChange: null,
    className: null,
};

const Search = ({ intl, value, onChange, onFiltersOpened, className }) => {
    const [filtersOpened, setFiltersOpened] = useState(false);

    const openFilters = useCallback(() => setFiltersOpened(true), [setFiltersOpened]);

    useEffect(() => {
        if (onFiltersOpened !== null) {
            onFiltersOpened(filtersOpened);
        }
    }, [filtersOpened]);

    const resetFilters = useCallback(() => {
        setFiltersOpened(false);
        if (onChange !== null) {
            onChange(null);
        }
    }, [setFiltersOpened, onChange]);

    const onSearchChange = useCallback(
        e => {
            const newValue =
                e.currentTarget.value !== ''
                    ? {
                          ...value,
                          search: e.currentTarget.value,
                      }
                    : { ...value, search: null };

            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange, value],
    );

    const onFiltersChange = useCallback(
        newFiltersValue => {
            const nonNullValue =
                newFiltersValue !== null
                    ? Object.keys(newFiltersValue)
                          .filter(key => newFiltersValue[key] !== null)
                          .reduce((acc, key) => ({ ...acc, [key]: newFiltersValue[key] }), null)
                    : null;

            const newValue =
                nonNullValue !== null
                    ? {
                          ...nonNullValue,
                      }
                    : null;

            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange, value],
    );

    const searchValue =
        value !== null && !isEmpty(value.search || null) ? value.search || null : null;

    const filtersValue =
        value !== null
            ? ['types', 'tags', 'users', 'usage'].reduce(
                  (currentValue, key) =>
                      typeof value[key] !== 'undefined'
                          ? {
                                ...currentValue,
                                [key]: value[key],
                            }
                          : currentValue,
                  {},
              )
            : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.filtersOpened]: filtersOpened,
                    [className]: className !== null,
                },
            ])}
        >
            <nav
                className={classNames([
                    'navbar',
                    'navbar-expand-md',
                    'navbar-light',
                    'bg-light',
                ])}
            >
                <form method="post" className="form-inline mr-auto">
                    <div className="input-group">
                        <span className="input-group-prepend">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </span>
                        <input
                            className="form-control"
                            type="text"
                            value={searchValue || ''}
                            placeholder={intl.formatMessage(messages.placeholder)}
                            onChange={onSearchChange}
                            onFocus={openFilters}
                        />
                    </div>
                </form>

                {!filtersOpened ? (
                    <Button
                        className={styles.button}
                        type="submit"
                        theme="outline-secondary"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                    >
                        Ajouter
                    </Button>
                ) : null}
                {filtersOpened ? (
                    <Button
                        className={styles.button}
                        type="submit"
                        theme="outline-secondary"
                        onClick={resetFilters}
                    >
                        Annuler
                    </Button>
                ) : null}
            </nav>

            {!isEmpty(filtersValue || null) ? (
                <ActiveFilters
                    className={styles.activeFilters}
                    value={filtersValue}
                    onChange={onFiltersChange}
                />
            ) : null}

            {filtersOpened ? (
                <SearchFilters
                    className={styles.searchFilter}
                    value={filtersValue}
                    onChange={onFiltersChange}
                />
            ) : null}
        </div>
    );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default injectIntl(Search);
