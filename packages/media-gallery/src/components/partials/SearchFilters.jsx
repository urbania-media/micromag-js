/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TagSection from './TagSection';

const propTypes = {
    filters: PropTypes.object, // eslint-disable-line
    sections: PropTypes.arrayOf(PropTypes.object),
    onFilterChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: null,
    sections: [],
    onFilterChange: null,
    className: null,
};

const SearchFilters = ({ filters, sections, onFilterChange, className }) => {
    const getActive = useCallback((items, sectionFilters) => {
        return items !== null
            ? items.map((it) => ({
                  ...it,
                  active: sectionFilters ? !!sectionFilters.find((f) => f === it.value) : false,
              }))
            : [];
    });

    const activeSections = useMemo(() => {
        return sections.map((section) => ({
            ...section,
            items: getActive(section.items, filters[section.value]),
        }));
    }, [getActive, sections, filters]);

    return (
        <div
            className={classNames([
                'bg-light',
                'flex-nowrap',
                'text-dark',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {activeSections.map(({ value, label, items }) => {
                const onClick = useCallback((data) => {
                    const val = filters[value] ? filters[value] : [];
                    const found = !!val.find((f) => f === data);
                    if (found) {
                        onFilterChange(
                            value,
                            val.filter((f) => f !== data),
                        );
                    } else if (data) {
                        if (value === 'recent') {
                            onFilterChange('search', data);
                        } else if (value === 'usage') {
                            onFilterChange(value, [data]);
                        } else {
                            onFilterChange(value, [...val, data]);
                        }
                    }
                });
                return (
                    <div className="section py-2">
                        <h5>{label}</h5>
                        <TagSection tags={items} onClick={onClick} />
                    </div>
                );
            })}
        </div>
    );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
