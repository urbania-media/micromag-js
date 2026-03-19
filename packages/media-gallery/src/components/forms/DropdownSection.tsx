import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { Label } from '@micromag/core';
import styles from '../../styles/forms/dropdown-section.module.css';

interface DropdownSectionProps {
    value?: string;
    items?: ({ label?: Label; value?: string | React.ReactNode; active?: boolean })[];
    onChange?: (...args: unknown[]) => void;
    className?: string;
}

function DropdownSection({ value = null, items = null, onChange = null, className = null }: DropdownSectionProps) {
    const [open, setOpen] = useState(false);
    const currentItem = items.find((i) => i.value === value);

    const onOpen = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    const onBlur = useCallback(() => {
        // Work around the event call order
        setTimeout(() => {
            setOpen(false);
        }, 300);
    }, [setOpen]);

    const onItemClick = useCallback(
        (e) => {
            const val = e.target.dataset.value || null;
            setOpen(false);
            onChange(val);
        },
        [setOpen],
    );

    return items !== null && items.length > 1 ? (
        <div
            className={classNames([
                styles.container,
                'dropdown',
                className,
            ])}
        >
            <span className={styles.label}>
                <FormattedMessage defaultMessage="Library for " description="Library source menu" />
            </span>
            <button
                className={classNames([
                    styles.dropdownToggle,
                    'dropdown-toggle',
                    {
                        open: open === true,
                    },
                ])}
                type="button"
                onClick={onOpen}
                onBlur={onBlur}
            >
                {(currentItem ? currentItem.label : null) || (
                    <FormattedMessage
                        defaultMessage="All"
                        description="Dropdown default all items label"
                    />
                )}
            </button>
            <div
                className={classNames([
                    styles.dropdown,
                    'dropdown-menu',
                    {
                        show: open === true,
                    },
                ])}
            >
                {items.map(({ label, value: itemValue }) => {
                    const itemClassNames = classNames([
                        'dropdown-item',
                        {
                            active: itemValue === value,
                        },
                    ]);

                    return (
                        <button
                            className={itemClassNames}
                            type="button"
                            key={`drop-${itemValue}`}
                            onClick={onItemClick}
                            data-value={itemValue}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    ) : null;
}

export default DropdownSection;
