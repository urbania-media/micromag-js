/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';
import * as PanneauPropTypes from '../../../lib/panneau/PropTypes';
import ToggleField from './Toggle';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.objectOf(PropTypes.bool),
    toggles: PanneauPropTypes.toggles,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    toggles: [],
    className: null,
    onChange: null,
};

const TogglesField = ({ name, value, toggles, onChange, className }) => {
    const onToggleChange = useCallback(
        (key, newToggleValue) => {
            const newValue = {
                ...value,
                [key]: newToggleValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return (
        <div
            className={classNames([
                'd-flex',
                'flex-column',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <ul className="list-group">
                {toggles.map(({ label: toggleLabel, key: toggleKey }) => (
                    <li key={`toggle-${toggleKey}`} className="list-group-item">
                        <div className="d-flex align-items-center">
                            <ToggleField
                                name={`${name}[${toggleKey}]`}
                                className="mr-2"
                                value={value !== null ? value[toggleKey] || false : false}
                                onChange={(newValue) => onToggleChange(toggleKey, newValue)}
                            />
                            {toggleLabel}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TogglesField.propTypes = propTypes;
TogglesField.defaultProps = defaultProps;

export default TogglesField;
