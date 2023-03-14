/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import Radios from './Radios';

import styles from '../styles/alignment.module.scss';

const icons = {
    horizontal: {
        left: (props) => <div {...props}>left</div>,
        middle: (props) => <div {...props}>middle</div>,
        right: (props) => <div {...props}>right</div>,
    },
    vertical: {
        top: (props) => <div {...props}>top</div>,
        middle: (props) => <div {...props}>middle</div>,
        bottom: (props) => <div {...props}>bottom</div>,
    },
};

const propTypes = {
    alignment: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'right', 'middle']),
        vertical: PropTypes.oneOf(['top', 'bottom', 'middle']),
    }),
    value: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'right', 'middle']),
        vertical: PropTypes.oneOf(['top', 'bottom', 'middle']),
    }),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    alignment: {
        horizontal: 'middle',
        vertical: 'middle',
    },
    value: null,
    className: null,
    onChange: null,
};

const Alignment = ({ alignment, value, className, onChange }) => {
    const onVerticalAlignChange = useCallback(
        (newVal) => {
            const v = newVal === value ? null : newVal;
            onChange({
                ...value,
                vertical: v,
            });
        },
        [alignment, value],
    );
    const onHorizontalAlignChange = useCallback(
        (newVal) => {
            const h = newVal === value ? null : newVal;
            onChange({
                ...value,
                horizontal: h,
            });
        },
        [alignment, value],
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
            {Object.keys(alignment).map((axis) =>
                axis(
                    <div
                        key={axis}
                        className={classNames(['d-flex', 'align-items-center', 'mb-2'])}
                    >
                        <small className={styles.label}>
                            {axis === 'horizontal' ? (
                                <FormattedMessage
                                    defaultMessage="Horizontal"
                                    description="Field label"
                                />
                            ) : (
                                <FormattedMessage
                                    defaultMessage="Vertical"
                                    description="Field label"
                                />
                            )}
                        </small>
                        <Radios
                            options={(axis === 'horizontal'
                                ? ['left', 'middle', 'right']
                                : ['top', 'middle', 'bottom']
                            ).map((type) => {
                                const Icon = icons[axis][type];

                                return {
                                    value: type,
                                    label: (
                                        <div className={styles.type}>
                                            <Icon className={styles.icon} />
                                        </div>
                                    ),
                                };
                            })}
                            value={value !== null ? value[axis] : null}
                            className={classNames([
                                styles.container,
                                {
                                    [className]: className !== null,
                                },
                            ])}
                            buttonClassName={styles.button}
                            onChange={
                                axis === 'horizontal'
                                    ? onHorizontalAlignChange
                                    : onVerticalAlignChange
                            }
                        />
                    </div>,
                ),
            )}
        </div>
    );
};

Alignment.propTypes = propTypes;
Alignment.defaultProps = defaultProps;

export default Alignment;
