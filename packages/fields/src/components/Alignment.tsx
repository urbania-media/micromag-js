/* eslint-disable react/jsx-props-no-spreading */
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import Radios from './Radios';

import styles from '../styles/alignment.module.css';

const icons = {
    horizontal: {
        left: (props) => (
            <div {...props}>
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            </div>
        ),
        middle: (props) => (
            <div {...props}>
                <FontAwesomeIcon icon={faDotCircle} className={styles.icon} />
            </div>
        ),
        right: (props) => (
            <div {...props}>
                <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
            </div>
        ),
    },
    vertical: {
        top: (props) => (
            <div {...props}>
                <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
            </div>
        ),
        middle: (props) => (
            <div {...props}>
                <FontAwesomeIcon icon={faDotCircle} className={styles.icon} />
            </div>
        ),
        bottom: (props) => (
            <div {...props}>
                <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
            </div>
        ),
    },
};

interface AlignmentProps {
    alignment?: { horizontal?: 'left' | 'right' | 'middle'; vertical?: 'top' | 'bottom' | 'middle' };
    value?: { horizontal?: 'left' | 'right' | 'middle'; vertical?: 'top' | 'bottom' | 'middle' };
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

const Alignment = ({ alignment = {
    horizontal: 'middle',
    vertical: 'middle',
}, value = null, className = null, onChange = null }) => {
    const onVerticalAlignChange = useCallback(
        (newVal) => {
            const { vertical = null, horizontal = null } = value || {};
            const v = newVal === vertical ? null : newVal;
            const nextValue =
                v === null && horizontal === null ? null : { ...(value || null), vertical: v };
            onChange(nextValue);
        },
        [value, onChange],
    );

    const onHorizontalAlignChange = useCallback(
        (newVal) => {
            const { horizontal = null, vertical = null } = value || {};
            const h = newVal === horizontal ? null : newVal;
            const nextValue =
                h === null && vertical === null
                    ? null
                    : {
                          ...(value || null),
                          horizontal: h,
                      };
            onChange(nextValue);
        },
        [value, onChange],
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
            {Object.keys(alignment).map((axis) => (
                <div key={axis} className={classNames(['d-flex', 'align-items-center', 'mb-2'])}>
                    <small className={styles.label}>
                        {axis === 'horizontal' ? (
                            <FormattedMessage
                                defaultMessage="Horizontal"
                                description="Field label"
                            />
                        ) : (
                            <FormattedMessage defaultMessage="Vertical" description="Field label" />
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
                            axis === 'horizontal' ? onHorizontalAlignChange : onVerticalAlignChange
                        }
                    />
                </div>
            ))}
        </div>
    );
};

export default Alignment;
