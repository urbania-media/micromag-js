import classNames from 'classnames';

import { PlaceholderImage, PlaceholderText } from '@micromag/core/components';

import Radios from './Radios';

interface ButtonLayoutProps {
    types?: string[];
    value?: string | null;
    defaultValue?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = [
    'label-bottom',
    'label-top',
    'no-label',
    'label-over',
    'label-right',
    'label-left',
];

function ButtonLayout({
    types = defaultTypes,
    value = null,
    defaultValue = null,
    className = null,
    onChange = null,
}: ButtonLayoutProps) {
    const finalValue = value === null && defaultValue !== null ? defaultValue : value;

    const getLayoutPreviewByType = (type) => {
        switch (type) {
            case 'label-bottom':
                return (
                    <div
                        className={classNames([
                            'd-flex',
                            'flex-column',
                            'align-items-center',
                            'm-auto',
                        ])}
                    >
                        <PlaceholderImage width="1.25em" height="1.25em" className="mb-1" />
                        <PlaceholderText lines={1} height={0.25} />
                    </div>
                );
            case 'label-top':
                return (
                    <div
                        className={classNames([
                            'd-flex',
                            'flex-column',
                            'align-items-center',
                            'm-auto',
                        ])}
                    >
                        <PlaceholderText lines={1} height={0.25} className="mb-1" />
                        <PlaceholderImage width="1.25em" height="1.25em" />
                    </div>
                );
            case 'no-label':
                return (
                    <div
                        className={classNames([
                            'd-flex',
                            'flex-column',
                            'align-items-center',
                            'm-auto',
                        ])}
                    >
                        <PlaceholderImage width="1.25em" height="1.25em" />
                    </div>
                );
            case 'label-over':
                return (
                    <div
                        className={classNames([
                            'd-flex',
                            'flex-column',
                            'align-items-center',
                            'm-auto',
                        ])}
                    >
                        <PlaceholderImage width="1.25em" height="1.25em" className="mb-1" />
                        <PlaceholderText lines={1} height={0.25} />
                    </div>
                );
            case 'label-right':
                return (
                    <div
                        className={classNames([
                            'd-flex',
                            'flex-row',
                            'align-items-center',
                            'm-auto',
                        ])}
                    >
                        <PlaceholderImage width="1.25em" height="1.25em" className="me-1" />
                        <PlaceholderText lines={1} height={0.25} width="1.25em" />
                    </div>
                );
            case 'label-left':
                return (
                    <div
                        className={classNames([
                            'd-flex',
                            'flex-row',
                            'align-items-center',
                            'm-auto',
                        ])}
                    >
                        <PlaceholderText lines={1} height={0.25} width="1.25em" className="me-1" />
                        <PlaceholderImage width="1.25em" height="1.25em" />
                    </div>
                );
            default:
                return <div />;
        }
    };

    return (
        <Radios
            options={types.map((type) => ({
                value: type,
                label: getLayoutPreviewByType(type),
            }))}
            value={finalValue || null}
            className={className}
            onChange={onChange}
            buttonClassName="d-flex"
            uncheckable
        />
    );
}

export default ButtonLayout;
