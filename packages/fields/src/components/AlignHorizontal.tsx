import classNames from 'classnames';

import Radios, { RadiosProps } from './Radios';

import styles from '../styles/align-horizontal.module.css';

interface AlignHorizontalProps extends RadiosProps {
    value?: 'left' | 'middle' | 'right' | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function AlignHorizontal({
    value = null,
    className = null,
    onChange = null,
    ...props
}: AlignHorizontalProps) {
    return (
        <Radios
            options={['left', 'middle', 'right'].map((type) => ({
                value: type,
                label: (
                    <div className={classNames([styles.icon, styles[type]])}>
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                ),
            }))}
            value={value !== null ? value : null}
            className={classNames(['d-inline-flex', className])}
            onChange={onChange}
            {...props}
        />
    );
}

export default AlignHorizontal;
