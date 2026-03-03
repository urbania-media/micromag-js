/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import Switch from 'rc-switch';
import React from 'react';

import styles from '../styles/toggle.module.css';

interface ToggleFieldProps {
    value?: boolean;
    defaultValue?: boolean;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function ToggleField({ value = null, defaultValue = null, className = null, onChange = null }) {
    const finalValue =
        value === null && (defaultValue === true || defaultValue === 'true') ? true : value;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Switch checked={finalValue !== null ? finalValue : false} onChange={onChange} />
        </div>
    );
}

ToggleField.isHorizontal = true;

export default ToggleField;
