/* eslint-disable react/no-array-index-key, jsx-a11y/label-has-associated-control, react/jsx-indent */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@micromag/core/components';

import CloseButton from '../buttons/Close';

import styles from '../../styles/partials/active-filters.module.scss';

const propTypes = {
    filters: PropTypes.shape({
        types: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        users: PropTypes.arrayOf(PropTypes.string),
        usage: PropTypes.arrayOf(PropTypes.oneOf(['used', 'unused'])),
    }),
    onChange: PropTypes.func,
    onReset: PropTypes.func,
    sections: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    onChange: null,
    onReset: null,
    sections: [],
    className: null,
};

const ActiveFilters = ({ filters, onChange, onReset, sections, className }) => {
    const handleReset = useCallback(() => {
        if (onReset !== null) {
            onReset();
        }
    }, [onReset]);

    const removeFilter = useCallback(
        (key, activeValue) => {
            const newFilterValue = filters[key].filter((it) => it !== activeValue);
            const newValue = newFilterValue.length > 0 ? newFilterValue : null;
            if (onChange !== null) {
                onChange(key, newValue);
            }
        },
        [onChange, filters],
    );

    const hasValue = Object.keys(filters).reduce(
        (oneHasValue, key) => oneHasValue || filters[key] !== null,
        false,
    );

    return (
        <div
            className={classNames([
                'w-100',
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            {hasValue ? (
                <div className={styles.heading}>
                    <div className={styles.title}>
                        <FormattedMessage
                            defaultMessage="Active filters"
                            description="Active filters title"
                        />
                    </div>
                    <CloseButton className={styles.resetButton} onClick={handleReset}>
                        <u>
                            <FormattedMessage
                                defaultMessage="Remove all"
                                description="Remove all button label"
                            />
                        </u>
                    </CloseButton>
                </div>
            ) : null}
            {filters !== null
                ? Object.keys(filters).map((key) => {
                      const section = sections.find((s) => s.value === key);
                      return section && filters[key] !== null
                          ? filters[key].map((activeValue) => {
                                const current = section.items.find((s) => s.value === activeValue);
                                const { label = '' } = current || {};
                                return (
                                    <Button
                                        className={styles.activeTag}
                                        key={`filter-button-${activeValue}`}
                                        type="submit"
                                        size="sm"
                                        label={
                                            <span>
                                                {section.label} : {label}
                                            </span>
                                        }
                                        theme="secondary"
                                        icon={<FontAwesomeIcon icon={faTimes} />}
                                        iconPosition="right"
                                        onClick={() => removeFilter(key, activeValue)}
                                    />
                                );
                            })
                          : null;
                  })
                : null}
        </div>
    );
};

ActiveFilters.propTypes = propTypes;
ActiveFilters.defaultProps = defaultProps;

export default ActiveFilters;
