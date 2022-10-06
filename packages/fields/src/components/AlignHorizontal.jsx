/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import Radios from './Radios';

import styles from '../styles/align-horizontal.module.scss';

const icons = {
    left: (props) => <div {...props}>left</div>,
    middle: (props) => <div {...props}>middle</div>,
    right: (props) => <div {...props}>right</div>,
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
            // const h = newVal === value ? null : newVal;
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
                    options={['left', 'middle', 'right'].map((type) => {
                        const Icon = icons[type];
                        return {
                            value: type,
                            label: (
                                <div className={styles.type}>
                                    <Icon className={styles.icon} />
                                </div>
                            ),
                        };
                    })}
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
