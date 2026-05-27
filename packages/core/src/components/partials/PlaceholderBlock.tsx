import classNames from 'classnames';
import React from 'react';

export interface PlaceholderBlockProps {
    width?: number | string;
    height?: number | string;
    outline?: boolean;
    className?: string | null;
    boxClassName?: string | null;
    children?: React.ReactNode | null;
    withInvertedColors?: boolean;
}

function PlaceholderBlock({
    width = '100%',
    height = null,
    outline = false,
    className = null,
    boxClassName = null,
    children = null,
}: PlaceholderBlockProps) {
    return (
        <div
            className={classNames([
                {
                    border: outline,
                    'border-2': outline,
                },
                className,
            ])}
            style={{
                '--bs-border-color': 'currentColor',
                borderColor: 'currentColor',
                // mixBlendMode: 'difference',
            }}
        >
            <div
                className={classNames([
                    {
                        'd-flex': outline,
                        'align-items-center': outline,
                        'justify-content-center': outline,
                        'w-100': outline,
                        'p-2': outline,
                    },
                    boxClassName,
                ])}
                style={{
                    width,
                    height,
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default PlaceholderBlock;
