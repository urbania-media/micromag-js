/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PlaceholderImage, PlaceholderText } from '@micromag/core/components';
import Keypad from '@micromag/element-keypad';

import Fields from './Fields';

import styles from '../styles/keypad-layout.module.css';

interface KeypadLayoutProps {
    value?: { color?: string; alpha?: number } | null;
    className?: string;
    onChange?: ((...args: unknown[]) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function KeypadLayout({
    value = null,
    onChange = null,
    closeForm = null,
    ...props
}: KeypadLayoutProps) {
    const { columnAlign = null, columns = null, spacing = null } = value || {};
    const finalSpacingPreview = Math.max(0, Math.min(4, spacing));

    const previewElement =
        value !== null ? (
            <Keypad
                className={styles.keypad}
                align={columnAlign}
                columns={columns}
                spacing={finalSpacingPreview}
                items={[1, 2, 3, 4].map((n) => (
                    <div
                        key={n}
                        className={classNames([
                            styles.preview,
                            {
                                // [styles.isPopupEmpty]: isPopupEmpty,
                            },
                        ])}
                    >
                        <PlaceholderImage className={styles.buttonVisual} height={20} />
                        <PlaceholderText lines={1} className={styles.buttonLabel} />
                    </div>
                ))}
            />
        ) : null;

    return (
        <div>
            {/* <div className={styles.keypadPreview}>
                {previewElement}
            </div> */}
            <Fields
                value={value}
                label={<FormattedMessage defaultMessage="Edit" description="Field label" />}
                onChange={onChange}
                noValueLabel={<FormattedMessage defaultMessage="Edit" description="Field label" />}
                {...props}
            />
        </div>
    );
}

export default KeypadLayout;
