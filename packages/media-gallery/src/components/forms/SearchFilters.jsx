/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TagSection from './TagSection';

import styles from '../../styles/forms/search-filters.module.scss';

const propTypes = {
    filters: PropTypes.object, // eslint-disable-line
    sections: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    sections: [],
    onChange: null,
    className: null,
};

const SearchFilters = ({ filters, sections, onChange, className }) => {
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
                'bg-light',
                'flex-nowrap',
                'text-dark',
                'mt-1',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {activeSections.map(({ value, label, items }) => {
                return (
                    <div key={`filter-${value}`} className={classNames([styles.section, 'py-2'])}>
                        <p className={classNames([styles.title, 'm-0'])}>{label}</p>
                        <TagSection tags={items} parent={value} onChange={onSectionChange} />
                    </div>
                );
            })}
        </div>
    );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
