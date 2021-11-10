/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import tinycolor from 'tinycolor2';
import styles from '../styles/color.module.scss';
import ColorPicker from './ColorPicker';
import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const ColorField = ({ value, onChange, closeForm, ...props }) => {
    const { color = null } = value || {};
    const hexColor = useMemo(
        () => (color !== null ? tinycolor(color).toHexString() : null),
        [color],
    );
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
    const onClickReset = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
        if (closeForm !== null) {
            closeForm();
        }
    }, [onChange, closeForm]);

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            label={hexColor}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Select a color..." description="No value label" />
            }
            {...props}
        >
            <div className="p-2">
                <ColorPicker className={styles.picker} value={value} onChange={onChange} />
                <div className="d-flex mt-4">
                    <Button theme="light" size="sm" onClick={closeForm}>
                        <FormattedMessage defaultMessage="Close" description="Button label" />
                    </Button>
                    {value !== null ? (
                        <Button
                            outline
                            theme="secondary"
                            size="sm"
                            className="ml-auto"
                            onClick={onClickReset}
                        >
                            <FormattedMessage defaultMessage="Clear" description="Button label" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </FieldWithForm>
    );
};

ColorField.propTypes = propTypes;
ColorField.defaultProps = defaultProps;
ColorField.withForm = true;

export default ColorField;
