/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import { ScreenPlaceholder } from '@micromag/core/components';
import { useScreenDefinition } from '@micromag/core/contexts';

import Radios from './Radios';

import styles from '../styles/layout.module.css';

interface ScreenLayoutFieldProps {
    value?: string | null;
    screenState?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function ScreenLayoutField({
    value = null,
    screenState = null,
    className = null,
    onChange = null,
    ...props
}: ScreenLayoutFieldProps) {
    const { id, layouts = [] } = useScreenDefinition();

    return (
        <Radios
            options={layouts.map((layout) => ({
                value: layout,
                label: (
                    <div className={styles.layout}>
                        <ScreenPlaceholder
                            screen={{
                                type: id,
                                layout,
                            }}
                            screenState={screenState}
                            withSize
                            className={styles.screen}
                        />
                    </div>
                ),
            }))}
            value={value || (layouts ? layouts[0] : null)}
            className={classNames([styles.container, className])}
            buttonClassName={styles.button}
            onChange={onChange}
        />
    );
}

export default ScreenLayoutField;
