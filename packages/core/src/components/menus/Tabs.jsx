/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '../../lib';
import Buttons from '../buttons/Buttons';

import styles from '../../styles/menus/tabs.module.css';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    size: MicromagPropTypes.buttonSize,
    theme: MicromagPropTypes.buttonTheme,
    renderItemButton: PropTypes.func,
    buttonClassName: PropTypes.string,
    className: PropTypes.string,
    onClickItem: PropTypes.func,
};

const TabsMenu = ({
    items = [],
    size = null,
    theme = 'secondary',
    renderItemButton = null,
    buttonClassName = null,
    className = null,
    onClickItem = null,
}) => (
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

TabsMenu.propTypes = propTypes;

export default TabsMenu;
