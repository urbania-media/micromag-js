import classNames from 'classnames';
import Switch from 'rc-switch';

import styles from '../styles/toggle.module.css';
import 'rc-switch/assets/index.css';

interface ToggleFieldProps {
    value?: boolean | null;
    defaultValue?: boolean | string | null;
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
        <Switch
            {...props}
            className={classNames([styles.container, className])}
            checked={finalValue !== null ? finalValue : false}
            onChange={onChange}
        />
    );
}

ToggleField.isHorizontal = true;

export default ToggleField;
