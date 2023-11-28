/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Switch from 'rc-switch';
import React from 'react';

// import * as AppPropTypes from '../../lib/PropTypes';
import styles from '../styles/toggle.module.scss';

const propTypes = {
    value: PropTypes.bool,
    defaultValue: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    defaultValue: null,
    className: null,
    onChange: null,
};

const ToggleField = ({ value, defaultValue, className, onChange }) => {
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
};

ToggleField.propTypes = propTypes;
ToggleField.defaultProps = defaultProps;
ToggleField.isHorizontal = true;

export default ToggleField;
