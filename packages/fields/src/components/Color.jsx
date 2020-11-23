import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromColor } from '@micromag/core/utils';
import tinycolor from 'tinycolor2';

import ColorPicker from './ColorPicker';

import styles from '../styles/color.module.scss';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
};

const ColorField = ({ value, onChange, isForm, isHorizontal, className }) => {
    const { color = null, alpha = null } = value || {};
    const hexColor = useMemo(() => (color !== null ? tinycolor(color).toHexString() : null), [
        color,
    ]);
    if (isForm) {
        return (
            <div className="p-2 bg-light text-dark">
                <ColorPicker value={value} onChange={onChange} />
            </div>
        );
    }

    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.color}
                    style={{
                        ...getStyleFromColor(value),
                    }}
                />
            </span>
        ) : null;
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {hexColor !== null || alpha !== null ? (
                <>
                    {!isHorizontal ? previewElement : null}
                    <span
                        className={classNames([
                            'text-monospace',
                            'text-truncate',
                            {
                                'ml-2': !isHorizontal,
                                'mr-2': isHorizontal,
                            },
                        ])}
                    >
                        {hexColor}
                    </span>
                    {isHorizontal ? previewElement : null}
                </>
            ) : (
                <span className="text-muted">
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
