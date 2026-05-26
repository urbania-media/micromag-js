import classNames from 'classnames';

import { getShadowCoords } from '@micromag/core/utils';

import Radios from './Radios';

interface ShadowAngleProps {
    types?: number[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = [45, 90, -45, -90];

function ShadowAngle({
    types = defaultTypes,
    value = null,
    className = null,
    ...props
}: ShadowAngleProps) {
    return (
        <Radios
            options={types.map((type) => {
                const { x, y } = getShadowCoords(type, 3);
                return {
                    value: type,
                    label: (
                        <div
                            style={{
                                width: '1em',
                                height: '1em',
                                border: `1px solid currentColor`,
                                position: 'relative',
                                boxShadow: `${x}px ${y}px 0 0 currentColor`,
                            }}
                        />
                    ),
                };
            })}
            value={value || null}
            className={classNames(['d-inline-flex', className])}
            uncheckable
            {...props}
        />
    );
}

export default ShadowAngle;
