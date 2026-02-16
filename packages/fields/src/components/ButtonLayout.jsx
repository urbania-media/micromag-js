import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { PlaceholderImage, PlaceholderText } from '@micromag/core/components';

import Radios from './Radios';

import styles from '../styles/button-layout.module.scss';

const propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    types: ['label-bottom', 'label-top', 'no-label', 'label-over', 'label-right', 'label-left'],
    value: null,
    defaultValue: null,
    className: null,
    onChange: null,
};

const ButtonLayout = ({ types, value, defaultValue, className, onChange }) => {
    const finalValue = value === null && defaultValue !== null ? defaultValue : value;

    const onButtonLayoutChange = useCallback(
        (newVal = null) => {
            onChange(newVal);
        },
        [finalValue, onChange],
    );

    const getLayoutPreviewByType = useCallback((type) => {
        switch (type) {
            case 'label-bottom':
                return (
                    <div>
                        <PlaceholderImage width="1.25em" height="1em" />
                        <PlaceholderText
                            className={styles.placeholderText}
                            lines={1}
                            lineMargin={1}
                        />
                    </div>
                );
            case 'label-top':
                return (
                    <div>
                        <PlaceholderText
                            className={styles.placeholderText}
                            lines={1}
                            lineMargin={1}
                        />
                        <PlaceholderImage width="1.25em" height="1em" />
                    </div>
                );
            case 'no-label':
                return (
                    <div>
                        <PlaceholderImage width="1.5em" height="1.5em" />
                    </div>
                );
            case 'label-over':
                return (
                    <div>
                        <PlaceholderImage width="1.5em" height="1.5em" />
                        <PlaceholderText
                            className={classNames([
                                styles.placeholderText,
                                styles.placeholderTextOver,
                            ])}
                            lines={1}
                            withInvertedColors={false}
                        />
                    </div>
                );
            case 'label-right':
                return (
                    <div className={classNames(['d-flex', 'flex-row', 'align-items-center'])}>
                        <PlaceholderImage width="0.625em" height="1.25em" />
                        <PlaceholderText
                            className={classNames([
                                styles.placeholderText,
                                styles.placeholderTextRight,
                            ])}
                            lines={1}
                            lineMargin={1}
                        />
                    </div>
                );
            case 'label-left':
                return (
                    <div className={classNames(['d-flex', 'flex-row', 'align-items-center'])}>
                        <PlaceholderText
                            className={classNames([
                                styles.placeholderText,
                                styles.placeholderTextRight,
                            ])}
                            lines={1}
                            lineMargin={1}
                        />
                        <PlaceholderImage width="0.625em" height="1.25em" />
                    </div>
                );
            default:
                return <div />;
        }
    }, []);

    return (
        <div
            className={classNames([
                'd-flex',
                'w-100',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Radios
                options={types.map((type) => ({
                    value: type,
                    label: getLayoutPreviewByType(type),
                }))}
                value={finalValue || null}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
                buttonClassName={styles.button}
                activeClassName={styles.active}
                onChange={onButtonLayoutChange}
                uncheckable
            />
        </div>
    );
};

ButtonLayout.propTypes = propTypes;
ButtonLayout.defaultProps = defaultProps;

export default ButtonLayout;
