import classNames from 'classnames';

import Radios, { RadiosProps } from './Radios';

interface BorderStyleProps extends RadiosProps {
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
    ...props
}: BorderStyleProps) {
    return (
        <Radios
            options={types.map((type) => ({
                value: type,
                label: (
                    <div
                        style={{
                            width: '1em',
                            height: '1em',
                            border: `2px ${type} currentColor`,
                        }}
                    />
                ),
            }))}
            uncheckable
            value={value || null}
            className={classNames(['d-inline-flex', className])}
            onChange={onChange}
            {...props}
        />
    );
}

export default BorderStyle;
