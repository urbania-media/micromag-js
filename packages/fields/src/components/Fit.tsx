import classNames from 'classnames';

import type { ObjectFitSize as ObjectFitSizeType } from '@micromag/core';

import Radios, { RadiosProps } from './Radios';

import styles from '../styles/fit.module.css';

interface ObjectFitSizeProps extends RadiosProps {
    values?: ObjectFitSizeType[];
    value?: ObjectFitSizeType | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultValues = ['cover', 'contain', null];

function ObjectFitSize({
    values = defaultValues,
    value = null,
    className = null,
    onChange = null,
    ...props
}: ObjectFitSizeProps) {
    return (
        <Radios
            {...props}
            options={values.map((val) => ({
                value: val,
                label: (
                    <div
                        className={classNames([styles.frame, 'position-relative ratio m-auto'])}
                        style={{ '--bs-aspect-ratio': '150%' }}
                    >
                        <div className="position-absolute w-100 h-100 top-0 start-0 p-1 d-flex flex-column">
                            {val !== null ? (
                                <div
                                    className={classNames([styles.media, 'w-100', 'm-auto'])}
                                    style={{
                                        height: val === 'cover' ? '100%' : '50%',
                                        background: 'currentcolor',
                                        objectFit: val || 'none',
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                ),
            }))}
            value={value}
            className={classNames(['d-flex', className])}
            onChange={onChange}
        />
    );
}

export default ObjectFitSize;
