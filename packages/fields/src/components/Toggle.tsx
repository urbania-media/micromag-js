import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface ToggleFieldProps extends Omit<
    HTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange'
> {
    inputId?: string | null;
    value?: boolean | null;
    defaultValue?: boolean | string | null;
    className?: string | null;
    disabled?: boolean;
    onChange?: ((newValue: boolean) => void) | null;
}

function ToggleField({
    inputId = null,
    value = null,
    defaultValue = null,
    className = null,
    onChange = null,
    disabled = false,
    ...props
}: ToggleFieldProps) {
    const finalValue =
        value === null && (defaultValue === true || defaultValue === 'true') ? true : value;
    return (
        <div className={classNames(['form-check form-switch fs-4 p-0', className])}>
            <input
                {...props}
                id={inputId}
                switch
                className="form-check-input m-0"
                type="checkbox"
                role="switch"
                checked={finalValue}
                disabled={disabled}
                onChange={(e) => {
                    if (onChange !== null) {
                        onChange(e.target.checked);
                    }
                }}
            />
        </div>
    );
    // return (
    //     <Switch
    //         {...props}
    //         className={classNames([styles.container, className])}
    //         checked={finalValue !== null ? finalValue : false}
    //         onChange={onChange}
    //     />
    // );
}

ToggleField.isHorizontal = true;

export default ToggleField;
