/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

// import { PlaceholderButton } from '@micromag/core/components';
import Radios from './Radios';

import styles from '../styles/align-horizontal.module.scss';

const icons = {
    left: (props) => (
        <div {...props}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    ),
    middle: (props) => (
        <div {...props}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    ),
    right: (props) => (
        <div {...props}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    ),
};

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

const AlignHorizontal = ({ value, className, onChange }) => {
    const onAlignChange = useCallback(
        (newVal) => {
            onChange(newVal);
        },
        [value],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={classNames(['d-flex', 'align-items-center', 'mb-2'])}>
                <Radios
                    options={['left', 'middle', 'right'].map((type) => ({
                        value: type,
                        label: (
                            <div className={classNames([styles.type, styles[type]])}>
                                <div className={styles.icon}>
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                    <div />
                                </div>
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
                    onChange={onAlignChange}
                />
            </div>
        </div>
    );
};

AlignHorizontal.propTypes = propTypes;
AlignHorizontal.defaultProps = defaultProps;

export default AlignHorizontal;
