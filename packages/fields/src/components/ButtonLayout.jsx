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
    types: ['label-bottom', 'label-top', 'no-label', 'label-over'],
    value: null,
    defaultValue: null,
    className: null,
    onChange: null,
};

const ButtonLayout = ({ types, value, defaultValue, className, onChange }) => {
    const finalValue = value === null && defaultValue !== null ? defaultValue : value;

    const onButtonLayoutChange = useCallback(
        (newVal) => {
            // const v = newVal === finalValue ? null : newVal;

            onChange(newVal);
        },
        [finalValue],
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
            default:
                return <div />;
        }
    }, []);

    return (
        <div
            className={classNames([
                'd-flex',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={classNames(['d-inline-flex', 'me-auto'])}>
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
        </div>
    );
};

ButtonLayout.propTypes = propTypes;
ButtonLayout.defaultProps = defaultProps;

export default ButtonLayout;
