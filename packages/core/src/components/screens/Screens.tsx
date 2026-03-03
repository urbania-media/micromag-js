/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Screen from './Screen';

import styles from '../../styles/screens/screens.module.css';

interface ScreensProps {
    screens: StoryComponent[];
    screen?: string;
    className?: string;
}

function Screens({ screens, screen: screenId = null, className = null }) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            {screens.map((screen) => {
                const { id } = screen;
                return (
                    <Screen
                        key={`screen-${id}`}
                        screen={screen}
                        className={classNames([
                            styles.screen,
                            {
                                [styles.visible]: screenId === id,
                            },
                        ])}
                    />
                );
            })}
        </div>
    );
}

export default Screens;
