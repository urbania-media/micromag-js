import classNames from 'classnames';

import Radios from './Radios';

interface BorderStyleProps {
    types?: string[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = ['solid', 'dotted', 'dashed'];

function BorderStyle({
    types = defaultTypes,
    value = null,
    className = null,
    onChange = null,
}: BorderStyleProps) {
    const onBorderStyleChange = (newVal) => {
        const v = newVal === value ? null : newVal;
        onChange(v);
    };

    return (
        <Radios
            options={types.map((type) => ({
                value: type,
                label: (
                    <div
                        style={{
                            width: '1.5em',
                            height: '1.5em',
                            border: `2px ${type} currentColor`,
                        }}
                    />
                ),
            }))}
            value={value || null}
            className={classNames(['d-inline-flex', className])}
            onChange={onBorderStyleChange}
        />
    );
}

export default BorderStyle;
