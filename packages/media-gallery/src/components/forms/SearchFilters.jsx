/* eslint-disable arrow-body-style */

/* eslint-disable react/jsx-props-no-spreading */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@micromag/core/components';
import styles from '../../styles/forms/search-filters.module.scss';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TagSection from './TagSection';

const propTypes = {
    filters: PropTypes.object, // eslint-disable-line
    sections: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    sections: [],
    onChange: null,
    onClose: null,
    className: null,
};

const SearchFilters = ({ filters, sections, onChange, onClose, className }) => {
    const intl = useIntl();
    const getActive = useCallback((items, sectionFilters) => {
        return items !== null
            ? items.map((it) => ({
                  ...it,
                  active: sectionFilters ? !!sectionFilters.find((f) => f === it.value) : false,
              }))
            : [];
    }, []);

    const activeSections = useMemo(() => {
        return sections.map((section) => ({
            ...section,
            items: getActive(section.items, filters[section.value]),
        }));
    }, [getActive, sections, filters]);

    const onSectionChange = useCallback(
        (data, section) => {
            const val = filters[section] ? filters[section] : [];
            const found = !!val.find((f) => f === data);
            if (found) {
                onChange(
                    section,
                    val.filter((f) => f !== data),
                );
            } else if (data) {
                if (section === 'recent') {
                    onChange('search', data);
                } else if (section === 'usage') {
                    onChange(section, [data]);
                } else {
                    onChange(section, [...val, data]);
                }
            }
        },
        [filters, onChange],
    );

    return (
        <div
            className={classNames([
                styles.container,
                'flex-nowrap',
                'mt-1',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {activeSections.length > 0 ? (
                <div
                    className={classNames([
                        'bg-light',
                        'flex-nowrap',
                        'text-dark',
                        'py-1',
                        'px-3',
                        'rounded',
                    ])}
                >
                    <Button
                        className={classNames([styles.closeBtn, 'py-1', 'px-1', 'text-dark'])}
                        icon={<FontAwesomeIcon icon={faTimes} />}
                        onClick={onClose}
                        title={intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Close button label in Media Gallery',
                        })}
                    />
                    {activeSections.map(({ value, label, items }) => {
                        return items.length > 0 ? (
                            <div
                                key={`filter-${value}`}
                                className={classNames([styles.section, 'py-2'])}
                            >
                                <p className={classNames([styles.title, 'm-0'])}>{label}</p>
                                <TagSection
                                    className={classNames([styles.tags])}
                                    tags={items}
                                    parent={value}
                                    onChange={onSectionChange}
                                />
                            </div>
                        ) : null;
                    })}
                </div>
            ) : null}
        </div>
    );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
