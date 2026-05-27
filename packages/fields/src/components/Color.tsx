import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import tinycolor from 'tinycolor2';

import type { ColorObject } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';

import ColorPicker from './ColorPicker';
import FieldWithForm, { FieldWithFormProps } from './FieldWithForm';

import styles from '../styles/color.module.css';

interface ColorFieldProps extends FieldWithFormProps {
    value?: ColorObject | null;
    disableAlpha?: boolean;
    onChange?: ((newValue: ColorObject | null) => void) | null;
}

function ColorField({
    value = null,
    onChange = null,
    closeForm = null,
    disableAlpha = false,
    disabled = false,
    ...props
}: ColorFieldProps) {
    const { color = null } = value || {};

    const hexColor = color !== null ? tinycolor(color).toHexString() : null;

    const previewElement =
        value !== null && color !== null ? (
            <span className={classNames([styles.preview, 'border', 'ms-1'])}>
                <span
                    style={{
                        display: 'block',
                        width: '1.5em',
                        height: '1.5em',
                        ...getStyleFromColor(value),
                    }}
                />
            </span>
        ) : null;

    const onClickReset = () => {
        if (onChange !== null) {
            onChange(null);
        }
        if (closeForm !== null) {
            closeForm();
        }
    };

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            label={hexColor}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Select..." description="No value label" />
            }
            canClear
            disabled={disabled}
            {...props}
        >
            <div className="p-2">
                <ColorPicker
                    value={value}
                    onChange={onChange}
                    disableAlpha={disableAlpha}
                    disabled={disabled}
                />
                <div className="d-flex mt-4">
                    <Button theme="light" onClick={closeForm}>
                        <FormattedMessage defaultMessage="Close" description="Button label" />
                    </Button>
                    {value !== null ? (
                        <Button
                            outline
                            theme="secondary"
                            className="ms-auto"
                            onClick={onClickReset}
                            disabled={disabled}
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
