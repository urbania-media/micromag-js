import classNames from 'classnames';
import React, { useCallback } from 'react';

import { PlaceholderImage, PlaceholderText, PlaceholderTitle } from '@micromag/core/components';

import Radios from './Radios';

import styles from '../styles/card-layout.module.css';

interface CardLayoutProps {
    types?: string[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = ['content-top', 'content-bottom', 'content-split'];

function CardLayout({
    types = defaultTypes,
    value = null,
    className = null,
    onChange = null,
}: CardLayoutProps) {
    const onButtonLayoutChange = (newVal) => {
        const v = newVal === value ? null : newVal;

        onChange(v);
    };

    const getLayoutPreviewByType = useCallback((type) => {
        switch (type) {
            case 'content-top':
                return (
                    <div className={styles.layout}>
                        <PlaceholderTitle lines={1} lineMargin={1} />
                        <PlaceholderText lines={2} lineMargin={1} />
                        <PlaceholderImage width="100%" height="1.25em" />
                    </div>
                );
            case 'content-bottom':
                return (
                    <div className={styles.layout}>
                        <PlaceholderImage width="100%" height="1.25em" />
                        <PlaceholderTitle lines={1} lineMargin={1} />
                        <PlaceholderText lines={2} lineMargin={1} />
                    </div>
                );
            case 'content-split':
                return (
                    <div className={styles.layout}>
                        <PlaceholderTitle lines={1} lineMargin={1} />
                        <PlaceholderImage width="100%" height="1.25em" />
                        <PlaceholderText lines={2} lineMargin={1} />
                    </div>
                );
            default:
                return <div />;
        }
    }, []);

    return (
        <div
            className={classNames([
                'd-flex',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={classNames(['d-inline-flex', 'me-auto'])}>
                <Radios
                    options={types.map((type) => ({
                        value: type,
                        label: getLayoutPreviewByType(type),
                    }))}
                    value={value || null}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                    buttonClassName={styles.button}
                    onChange={onButtonLayoutChange}
                    uncheckable
                />
            </div>
        </div>
    );
}

export default CardLayout;
