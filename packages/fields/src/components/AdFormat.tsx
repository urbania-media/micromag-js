import classNames from 'classnames';

import Radios, { RadiosProps } from './Radios';

type AdFormat = {
    name: string;
    width: number;
    height: number;
};

interface AdFormatFieldProps extends Omit<RadiosProps, 'value'> {
    formats?: AdFormat[];
    value?: AdFormat | null;
    className?: string | null;
    onChange?: ((newValue: AdFormat | null) => void) | null;
}

const defaultFormats = [
    { name: '300x200', width: 300, height: 200 },
    { name: '300x100', width: 300, height: 100 },
    { name: '250x250', width: 250, height: 250 },
];

function AdFormatField({
    formats = defaultFormats,
    value = null,
    className = null,
    onChange = null,
    ...props
}: AdFormatFieldProps) {
    const onRadiosChange = (newValue) => {
        const newType = formats.find((format) => format.name === newValue) || null;
        if (onChange !== null) {
            onChange(newType);
        }
    };
    return (
        <Radios
            {...props}
            options={formats.map((format) => ({
                value: format.name,
                label: (
                    <div
                        className="ratio"
                        style={{
                            '--bs-aspect-ratio': `${(format.height / format.width) * 100}%`,
                            width: `1em`,
                            border: `2px solid currentcolor`,
                        }}
                    />
                ),
            }))}
            value={value?.name || formats?.[0]?.name || null}
            className={classNames(['d-inline-flex', className])}
            onChange={onRadiosChange}
        />
    );
}

export default AdFormatField;
