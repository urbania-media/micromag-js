/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '../../lib';
import Screen from './Screen';

import styles from '../../styles/screens/screens.module.scss';

const propTypes = {
    screens: MicromagPropTypes.storyComponents.isRequired,
    screen: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    className: null,
};

const Screens = ({ screens, screen: screenId, className }) => (
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
Screens.defaultProps = defaultProps;

export default Screens;
