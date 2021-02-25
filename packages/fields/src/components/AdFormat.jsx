import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Radios from './Radios';

import styles from '../styles/border-style.module.scss';

const propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    types: [
        { name: '300x200', width: 300, height: 200 },
        { name: '300x100', width: 300, height: 100 },
        { name: '250x250', width: 250, height: 250 },
    ],
    value: null,
    className: null,
    onChange: null,
};

const AdFormatField = ({ types, value, className, onChange }) => (
    <Radios
        options={types.map((type) => ({
            value: type,
            label: (
                <div className={styles.type}>
                    <div
                        style={{
                            width: type.width / 10,
                            height: type.height / 10,
                            border: `2px solid #ccc`,
                        }}
                    />
                </div>
            ),
        }))}
        value={value || (types ? types[0] : null)}
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        buttonClassName={styles.button}
        onChange={onChange}
    />
);

AdFormatField.propTypes = propTypes;
AdFormatField.defaultProps = defaultProps;

export default AdFormatField;
