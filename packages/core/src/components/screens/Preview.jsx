/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';

import Screen from './Screen';
import ScreenSizer from './ScreenSizer';

import styles from '../../styles/screens/preview.module.scss';

const propTypes = {
    screen: MicromagPropTypes.component.isRequired,
    screenState: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    className: PropTypes.string,
    withSize: PropTypes.bool,
    hidden: PropTypes.bool,
};

const defaultProps = {
    screenState: null,
    width: undefined,
    height: undefined,
    screenWidth: undefined,
    screenHeight: undefined,
    className: null,
    withSize: false,
    hidden: false,
};

const ScreenPreview = ({
    screen,
    screenState,
    width,
    height,
    screenWidth,
    screenHeight,
    className,
    withSize,
    hidden,
    ...props
}) => {
    const screenElement = (
        <Screen
            screen={screen}
            renderContext="preview"
            screenState={screenState}
            width={!withSize ? width : undefined}
            height={!withSize ? height : undefined}
            className={classNames([
                styles.screen,
                {
                    [className]: !withSize,
                },
            ])}
            {...props}
        />
    );

    const element = !hidden ? screenElement : <div />;
    const screenWithSize = withSize ? (
        <ScreenSizer
            className={className}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            width={width}
            height={height}
        >
            {element}
        </ScreenSizer>
    ) : (
        element
    );

    return screenWithSize;
};

ScreenPreview.propTypes = propTypes;
ScreenPreview.defaultProps = defaultProps;

export default React.memo(ScreenPreview);
