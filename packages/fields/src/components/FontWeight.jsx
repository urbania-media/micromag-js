/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/border-width.module.scss';
// import * as AppPropTypes from '../../lib/PropTypes';
import Slider from './Slider';

const propTypes = {
    value: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    sizes: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    className: null,
    onChange: null,
};

const FontWeight = ({ value, sizes, className, onChange }) => (
    <Slider
        value={value}
        min={sizes[0]}
        max={sizes[sizes.length - 1]}
        marks={sizes}
        marksStep={100}
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        onChange={onChange}
    />
);

FontWeight.propTypes = propTypes;
FontWeight.defaultProps = defaultProps;

export default FontWeight;
