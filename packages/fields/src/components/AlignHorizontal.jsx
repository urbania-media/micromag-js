/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import Radios from './Radios';

import styles from '../styles/align-horizontal.module.scss';

const propTypes = {
    value: PropTypes.oneOf(['left', 'middle', 'right']),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const AlignHorizontal = ({ value, className, onChange }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <div className={classNames(['d-flex', 'align-items-center'])}>
            <Radios
                options={['left', 'middle', 'right'].map((type) => ({
                    value: type,
                    label: (
                        <div className={classNames([styles.icon, styles[type]])}>
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    ),
                }))}
                value={value !== null ? value : null}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
                buttonClassName={styles.button}
                onChange={onChange}
            />
        </div>
    </div>
);

AlignHorizontal.propTypes = propTypes;
AlignHorizontal.defaultProps = defaultProps;

export default AlignHorizontal;
