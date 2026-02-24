/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';

import Screen from './Screen';

import styles from '../../styles/screens/screens.module.css';

const propTypes = {
    screens: MicromagPropTypes.storyComponents.isRequired,
    screen: PropTypes.string,
    className: PropTypes.string,
};

const Screens = ({ screens, screen: screenId = null, className = null }) => (
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

Screens.propTypes = propTypes;

export default Screens;
