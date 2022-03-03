/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '../../lib';
import styles from '../../styles/screens/screen-placeholder.module.scss';
import Screen from './Screen';
import ScreenSizer from './ScreenSizer';

const propTypes = {
    screen: MicromagPropTypes.component.isRequired,
    layout: PropTypes.string,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    screenState: PropTypes.string,
    withSize: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    layout: undefined,
    screenState: null,
    screenWidth: 100,
    screenHeight: 150,
    withSize: false,
    className: null,
};

const ScreenPlaceholder = ({
    screen,
    layout,
    screenWidth,
    screenHeight,
    screenState,
    withSize,
    className,
    ...props
}) => {
    const screenElement = (
        <Screen
            screen={screen}
            renderContext="placeholder"
            screenState={screenState}
            layout={layout}
            className={classNames([
                styles.screen,
                {
                    [className]: !withSize,
                },
            ])}
            {...props}
        />
    );
    return withSize ? (
        <ScreenSizer className={className} screenWidth={screenWidth} screenHeight={screenHeight}>
            {screenElement}
        </ScreenSizer>
    ) : (
        screenElement
    );
};

ScreenPlaceholder.propTypes = propTypes;
ScreenPlaceholder.defaultProps = defaultProps;

export default React.memo(ScreenPlaceholder);
