/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Label, useFieldsManager } from '@micromag/core';

import styles from '../../styles/forms/search-filters-old.module.scss';

const propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.shape({
        search: PropTypes.string,
        types: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        users: PropTypes.arrayOf(PropTypes.string),
        usage: PropTypes.arrayOf(PropTypes.oneOf(['used', 'unused'])),
    }),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    filters: [
        {
            id: 'search',
            title: 'Recherches récents',
            type: 'radios',
            options: [
                { value: 'vhs', label: 'Vhs' },
                { value: 'final', label: 'Final' },
                { value: 'entrevue', label: 'Entrevue' },
                { value: 'marcel', label: 'Marcel' },
            ],
        },
        {
            id: 'types',
            title: 'Types',
            type: 'checkboxes',
            options: [
                { value: 'videos', label: 'Vidéos' },
                { value: 'images', label: 'Images' },
                { value: 'audio', label: 'Audio' },
                { value: 'policies', label: 'Policies' },
                { value: 'blooper', label: 'Blooper' },
            ],
        },
        {
            id: 'tags',
            title: 'Étiquettes',
            type: 'checkboxes',
            options: [
                { value: 'logos', label: 'Logos' },
                { value: 'backgrounds', label: 'Backgrounds' },
                { value: 'motifs', label: 'Motifs' },
                { value: 'loops', label: 'Loops' },
            ],
        },
        {
            id: 'users',
            title: 'Ajouté par',
            type: 'checkboxes',
            options: [
                { value: 'martin', label: 'Martin' },
                { value: 'regimbald', label: 'Régimbald' },
                { value: 'myriam', label: 'Myriam' },
            ],
        },
        {
            id: 'usage',
            title: 'Usage',
            type: 'radios',
            options: [
                { value: 'used', label: 'Déja utilisé' },
                { value: 'unused', label: 'Inutilisé' },
            ],
        },
    ],
    value: null,
    onChange: null,
    className: null,
};

const SearchFilters = ({ filters, value, onChange, className }) => {
    const fieldsManager = useFieldsManager();
    const onFieldChange = useCallback(
        (key, newFilterValue) => {
            const newValue =
                key === 'usage'
                    ? {
                          ...value,
                          [key]: newFilterValue !== null ? newFilterValue.split() : null,
                      }
                    : {
                          ...value,
                          [key]: newFilterValue,
                      };

            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange, value],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {filters.map(({ id, title, type, options }) => {
                const FieldComponent = fieldsManager.getComponent(type) || null;
                return (
                    <div key={`${type}-${id}`}>
                        <div className={styles.border} />
                        <div className={styles.filter}>
                            <label className={styles.label}>
                                {title !== null ? <Label>{title}</Label> : null}
                            </label>
                            <FieldComponent
                                className={styles.row}
                                options={options}
                                name={id}
                                value={value !== null ? value[id] || null : null}
                                onChange={(newValue) => onFieldChange(id, newValue)}
                                hasIcon={id === 'users'}
                                noWrap
                                spaced
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
