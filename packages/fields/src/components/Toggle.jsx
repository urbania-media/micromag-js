/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from 'rc-switch';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../styles/toggle.module.scss';

const propTypes = {
    value: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const ToggleField = ({ value, className, onChange }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <Switch checked={value !== null ? value : false} onChange={onChange} />
    </div>
);

ToggleField.propTypes = propTypes;
ToggleField.defaultProps = defaultProps;
ToggleField.isHorizontal = true;

export default ToggleField;
