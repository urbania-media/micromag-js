/* eslint-disable react/no-array-index-key, jsx-a11y/label-has-associated-control, react/jsx-indent */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core';
import CloseButton from '../buttons/Close';

import styles from '../../styles/partials/active-filters.module.scss';

const propTypes = {
    value: PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        users: PropTypes.arrayOf(PropTypes.string),
        usage: PropTypes.arrayOf(PropTypes.oneOf(['used', 'unused'])),
    }),
    onChange: PropTypes.func,
    filterTitles: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    onChange: null,
    filterTitles: [
        { id: 'types', title: 'types' },
        { id: 'tags', title: 'étiquettes' },
        { id: 'users', title: 'ajouté par' },
        { id: 'usage', title: 'usage' },
    ],
    className: null,
};

const ActiveFilters = ({ value, onChange, filterTitles, className }) => {
    const handleReset = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
    }, [onChange]);

    const removeFilter = useCallback(
        (key, activeValue) => {
            const newFilterValue = value[key].filter(it => it !== activeValue);
            const newValue = {
                ...value,
                [key]: newFilterValue.length > 0 ? newFilterValue : null,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange, value],
    );

    const hasValue = Object.keys(value).reduce(
        (oneHasValue, key) => oneHasValue || value[key] !== null,
        false,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            {hasValue ? (
                <div className={styles.heading}>
                    <div className={styles.title}> Filtres Actifs </div>
                    <CloseButton className={styles.resetButton} onClick={handleReset}>
                        <u>Retirer tous</u>
                    </CloseButton>
                </div>
            ) : null}

            {value !== null
                ? Object.keys(value).map(key => {
                      const { title } = filterTitles.find(it => it.id === key);
                      return value[key] !== null
                          ? value[key].map(activeValue => (
                                <Button
                                    className={styles.activeTag}
                                    key={`filter-button-${activeValue}`}
                                    type="submit"
                                    size="sm"
                                    label={`${title.toUpperCase()} ${activeValue
                                        .charAt(0)
                                        .toUpperCase()}${activeValue.slice(1)}`}
                                    theme="secondary"
                                    icon={<FontAwesomeIcon icon={faTimes} />}
                                    iconPosition="right"
                                    onClick={() => removeFilter(key, activeValue)}
                                />
                            ))
                          : null;
                  })
                : null}
        </div>
    );
};

ActiveFilters.propTypes = propTypes;
ActiveFilters.defaultProps = defaultProps;

export default ActiveFilters;
