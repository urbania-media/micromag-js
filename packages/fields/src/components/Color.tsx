/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import tinycolor from 'tinycolor2';

import { Button } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';

import ColorPicker from './ColorPicker';
import FieldWithForm from './FieldWithForm';

import styles from '../styles/color.module.css';

interface ColorFieldProps {
    value?: { color?: string; alpha?: number } | null;
    isForm?: boolean;
    isHorizontal?: boolean;
    canClear?: boolean;
    disableAlpha?: boolean;
    className?: string;
    onChange?: ((...args: unknown[]) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function ColorField({
    value = null,
    onChange = null,
    closeForm = null,
    disableAlpha = false,
    canClear = true,
    ...props
}: ColorFieldProps) {
    const { color = null } = value || {};

    const hexColor = useMemo(
        () => (color !== null ? tinycolor(color).toHexString() : null),
        [color],
    );

    const previewElement =
        value !== null && color !== null ? (
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
            canClear={canClear}
            {...props}
        >
            <div className="p-2">
                <ColorPicker
                    className={styles.picker}
                    value={value}
                    onChange={onChange}
                    disableAlpha={disableAlpha}
                />
                <div className="d-flex mt-4">
                    <Button theme="light" size="md" onClick={closeForm}>
                        <FormattedMessage defaultMessage="Close" description="Button label" />
                    </Button>
                    {value !== null ? (
                        <Button
                            outline
                            theme="secondary"
                            size="md"
                            className="ms-auto"
                            onClick={onClickReset}
                        >
                            <FormattedMessage defaultMessage="Clear" description="Button label" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </FieldWithForm>
    );
}

ColorField.withForm = true;

export default ColorField;
