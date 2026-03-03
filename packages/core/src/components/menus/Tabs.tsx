/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Buttons from '../buttons/Buttons';

import styles from '../../styles/menus/tabs.module.css';

interface TabsMenuProps {
    items?: MenuItem[];
    size?: ButtonSize;
    theme?: ButtonTheme;
    renderItemButton?: (...args: unknown[]) => void;
    buttonClassName?: string;
    className?: string;
    onClickItem?: (...args: unknown[]) => void;
}

function TabsMenu({
    items = [],
    size = null,
    theme = 'secondary',
    renderItemButton = null,
    buttonClassName = null,
    className = null,
    onClickItem = null,
}: TabsMenuProps) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <Buttons
                buttons={items}
                size={size}
                theme={theme}
                renderButton={renderItemButton}
                onClickButton={onClickItem}
                className={styles.buttons}
                buttonClassName={classNames([
                    styles.button,
                    {
                        [buttonClassName]: buttonClassName !== null,
                    },
                ])}
            />
        </div>
    );
}

export default TabsMenu;
