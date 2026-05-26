import classNames from 'classnames';

import Radios, { RadiosProps } from './Radios';

import styles from '../styles/align-vertical.module.css';

interface AlignVerticalProps extends RadiosProps {
    value?: 'top' | 'bottom' | 'middle' | null;
    defaultValue?: 'top' | 'bottom' | 'middle' | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function AlignVertical({
    value = null,
    defaultValue = null,
    className = null,
    ...props
}: AlignVerticalProps) {
    return (
        <Radios
            {...props}
            options={['top', 'middle', 'bottom'].map((type) => ({
                value: type,
                label: (
                    <div className={classNames([styles.icon, styles[type]])}>
                        <div />
                        <div />
                        <div />
                    </div>
                ),
            }))}
            value={value === null && defaultValue !== null ? defaultValue : value}
            className={classNames(['d-inline-flex', className])}
        />
    );
}

export default AlignVertical;
