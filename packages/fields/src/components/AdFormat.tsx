import classNames from 'classnames';

import Radios from './Radios';

interface AdFormatFieldProps {
    types?: { name: string; width: number; height: number }[];
    value?: { name: string; width: number; height: number } | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = [
    { name: '300x200', width: 300, height: 200 },
    { name: '300x100', width: 300, height: 100 },
    { name: '250x250', width: 250, height: 250 },
];

function AdFormatField({
    types = defaultTypes,
    value = null,
    className = null,
    onChange = null,
}: AdFormatFieldProps) {
    return (
        <Radios
            options={types.map((type) => ({
                value: type,
                label: (
                    <div
                        style={{
                            width: type.width / 10,
                            height: type.height / 10,
                            border: `2px solid #ccc`,
                        }}
                    />
                ),
            }))}
            value={value || (types ? types[0] : null)}
            className={classNames(['d-inline-flex', className])}
            onChange={onChange}
        />
    );
}

export default AdFormatField;
