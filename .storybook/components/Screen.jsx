import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDeviceScreens } from '../../packages/core/src/utils';
import { useScreenSizeFromElement } from '../../packages/core/src/hooks';
import { ScreenSizeProvider } from '../../packages/core/src/contexts';

import styles from './styles/screen.module.scss';

const propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    screenClassName: PropTypes.string,
    withBorder: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    width: null,
    height: null,
    className: null,
    screenClassName: null,
    withBorder: false,
};

const Screen = ({ width, height, className, screenClassName, withBorder, children }) => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: getDeviceScreens(),
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withBorder]: withBorder,
                    [styles.withSize]: width !== null || height !== null,
                    [className]: className !== null,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            <div
                ref={refContainer}
                className={classNames([
                    styles.screen,
                    {
                        [screenClassName]: screenClassName !== null,
                    },
                ])}
            >
                <ScreenSizeProvider size={screenSize}>{children}</ScreenSizeProvider>
            </div>
        </div>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default Screen;
