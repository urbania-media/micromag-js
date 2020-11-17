import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromColor } from '@micromag/core/utils';

import ColorPicker from './ColorPicker';

import styles from '../styles/color.module.scss';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    className: null,
    onChange: null,
};

const ColorField = ({ value, onChange, isForm, className }) => {
    const { color = null, alpha = null } = value || {};
    return isForm ? (
        <div className={classNames(['p-2', 'bg-light', styles.form])}>
            <ColorPicker value={value} onChange={onChange} />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {color !== null || alpha !== null ? (
                <>
                    <span className={styles.value}>{color}</span>
                    <span className={styles.preview}>
                        <span
                            className={styles.color}
                            style={{
                                ...getStyleFromColor(value),
                            }}
                        />
                    </span>
                </>
            ) : (
                <span className={styles.noValue}>
                    <FormattedMessage
                        defaultMessage="Select a color..."
                        description="No value label"
                    />
                </span>
            )}
        </div>
    );
};

ColorField.propTypes = propTypes;
ColorField.defaultProps = defaultProps;
ColorField.withForm = true;

export default ColorField;
