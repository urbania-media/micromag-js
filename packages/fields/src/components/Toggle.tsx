import classNames from 'classnames';
import Switch from 'rc-switch';

import styles from '../styles/toggle.module.css';

interface ToggleFieldProps {
    value?: boolean | null;
    defaultValue?: boolean | null;
    className?: string | null;
    disabled?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
}

function ToggleField({
    value = null,
    defaultValue = null,
    className = null,
    onChange = null,
    ...props
}: ToggleFieldProps) {
    const finalValue =
        value === null && (defaultValue === true || defaultValue === 'true') ? true : value;
    return (
        <div className={classNames([styles.container, className])}>
            <Switch
                {...props}
                checked={finalValue !== null ? finalValue : false}
                onChange={onChange}
            />
        </div>
    );
}

ToggleField.isHorizontal = true;

export default ToggleField;
