import isObject from 'lodash/isObject';
import { FormattedMessage, useIntl } from 'react-intl';

import { Padding } from '@micromag/core';
import { Button } from '@micromag/core/components';

import FieldWithForm from './FieldWithForm';
import Spacing from './Spacing';

interface PaddingFieldProps {
    value?: number | Padding | null;
    isForm?: boolean;
    isHorizontal?: boolean;
    className?: string;
    onChange?: ((newValue: Padding | null) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function PaddingField({
    value = null,
    isForm = false,
    onChange = null,
    closeForm = null,
    ...props
}: PaddingFieldProps) {
    const intl = useIntl();

    const {
        top = null,
        left = null,
        right = null,
        bottom = null,
    } = isObject(value) ? value : { top: value, left: value, bottom: value, right: value };

    const previewElement =
        value !== null ? (
            <span>
                {isObject(value)
                    ? `${top || 0}px ${left || 0}px ${bottom || 0}px ${right || 0}px`
                    : `${value}px`}
            </span>
        ) : null;

    const onClickReset = () => {
        if (onChange !== null) {
            onChange(null);
        }
    };

    const onSpacingChange = (newValue, direction = null) => {
        if (direction !== null) {
            onChange({ ...(isObject(value) ? value : null), [direction]: newValue });
        } else {
            onChange(newValue);
        }
    };

    return (
        <FieldWithForm
            isForm={isForm}
            value={value}
            onChange={onChange}
            label={null}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Select a size..." description="No value label" />
            }
            {...props}
        >
            <div className="p-2">
                <div className="d-flex w-100 align-content-center justify-content-center my-2">
                    <Spacing
                        className="w-auto"
                        value={top}
                        onChange={(val) => onSpacingChange(val, 'top')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Top',
                            description: 'Direction',
                        })}
                    />
                </div>
                <div className="d-flex w-100 align-content-center justify-content-between my-2">
                    <Spacing
                        className="w-auto"
                        value={left}
                        onChange={(val) => onSpacingChange(val, 'left')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Left',
                            description: 'Direction',
                        })}
                    />
                    <Spacing
                        className="w-auto"
                        value={right}
                        onChange={(val) => onSpacingChange(val, 'right')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Right',
                            description: 'Direction',
                        })}
                    />
                </div>
                <div className="d-flex w-100 align-content-center justify-content-center my-2">
                    <Spacing
                        className="w-auto"
                        value={bottom}
                        onChange={(val) => onSpacingChange(val, 'bottom')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Bottom',
                            description: 'Direction',
                        })}
                    />
                </div>
                <div className="d-flex mt-4">
                    <Button theme="light" size="sm" onClick={closeForm}>
                        <FormattedMessage defaultMessage="Close" description="Button label" />
                    </Button>
                    {value !== null ? (
                        <Button
                            outline
                            theme="secondary"
                            size="sm"
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

PaddingField.withForm = true;

export default PaddingField;
