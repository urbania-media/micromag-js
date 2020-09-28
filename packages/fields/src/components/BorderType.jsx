import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Radios from './Radios';

import styles from '../styles/border-type.module.scss';

const propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    types: ['solid', 'dotted', 'dashed', 'groove'],
    value: null,
    className: null,
    onChange: null,
};

const BorderTypeField = ({ types, value, className, onChange }) => (
    <Radios
        options={types.map((type) => ({
            value: type,
            label: (
                <div className={styles.type}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            border: `2px ${type} #CCC`,
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

BorderTypeField.propTypes = propTypes;
BorderTypeField.defaultProps = defaultProps;

export default BorderTypeField;
