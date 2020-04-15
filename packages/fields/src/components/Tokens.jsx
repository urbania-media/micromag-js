/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useCallback } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles/tokens.module.scss';

const propTypes = {
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    options: [
        { id: 'logos', label: 'Logos' },
        { id: 'backgrounds', label: 'Backgrounds' },
        { id: 'motifs', label: 'Motifs' },
        { id: 'loops', label: 'Loops' },
    ],
    onChange: null,
    className: null,
};

const Tokens = ({ value, options, onChange, className }) => {

    const loadOptions = useCallback(
        inputValue => {
            return new Promise((resolve) => {
                const filtered = options.filter(it =>
                    it.label.toLowerCase().includes(inputValue.toLowerCase()),
                );
                resolve(filtered)
            })
        },
        [options],
    );

    const onTokenChange = useCallback(newValue => (onChange !== null ? onChange(newValue) : null));

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <AsyncCreatableSelect
                isMulti
                loadOptions={inputValue => loadOptions(inputValue)}
                defaultOptions={options}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                onChange={onTokenChange}
                value={value}
                placeholder="Ajouter des étiquettes..."
            />
        </div>
    );
};

Tokens.propTypes = propTypes;
Tokens.defaultProps = defaultProps;

export default Tokens;
