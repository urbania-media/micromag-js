/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { ScreenPlaceholder } from '@micromag/core/components';
import { useScreenDefinition } from '@micromag/core/contexts';

import Radios from './Radios';

import styles from '../styles/layout.module.css';

interface ScreenLayoutFieldProps {
    value?: string;
    screenState?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

const ScreenLayoutField = ({ value = null, screenState = null, className = null, onChange = null, ...props }) => {
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
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            buttonClassName={styles.button}
            onChange={onChange}
        />
    );
};

export default ScreenLayoutField;
