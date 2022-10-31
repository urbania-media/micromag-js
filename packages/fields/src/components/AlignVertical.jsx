/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import Radios from './Radios';

import styles from '../styles/align-vertical.module.scss';

const icons = {
    top: (props) => <div {...props}>top</div>,
    middle: (props) => <div {...props}>middle</div>,
    bottom: (props) => <div {...props}>bottom</div>,
};

const propTypes = {
    value: PropTypes.oneOf(['top', 'bottom', 'middle']),
    defaultValue: PropTypes.oneOf(['top', 'bottom', 'middle']),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    defaultValue: null,
    className: null,
    onChange: null,
};

const AlignVertical = ({ value, defaultValue, className, onChange }) => {
    const finalValue = value === null && defaultValue !== null ? defaultValue : value;
    const onAlignChange = useCallback(
        (newVal) => {
            onChange(newVal);
        },
        [finalValue],
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
                    options={['top', 'middle', 'bottom'].map((type) => {
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
                    value={finalValue !== null ? finalValue : null}
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

AlignVertical.propTypes = propTypes;
AlignVertical.defaultProps = defaultProps;

export default AlignVertical;
