/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';
import Slider from './Slider';

import styles from '../styles/border-width.module.scss';

const propTypes = {
    value: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    sizes: [0, 2, 6, 10, 20, 30],
    className: null,
    onChange: null,
};

const BorderRadius = ({ value, sizes, className, onChange }) => (
    <Slider
        value={value}
        min={sizes[0]}
        max={sizes[sizes.length - 1]}
        marks={sizes}
        withInput
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        onChange={onChange}
    />
);

BorderRadius.propTypes = propTypes;
BorderRadius.defaultProps = defaultProps;

export default BorderRadius;
