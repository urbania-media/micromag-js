import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDeviceScreens } from '../../packages/core/src/utils';
import { useScreenSizeFromElement } from '../../packages/core/src/hooks';
import * as MicromagPropTypes from '../../packages/core/src/lib/PropTypes';
import { ScreenProvider } from '../../packages/core/src/contexts/ScreenContext';
import { ScreenSizeProvider } from '../../packages/core/src/contexts/ScreenSizeContext';
import { ApiProvider } from '../../packages/data/src/contexts/ApiContext';

import styles from './styles/screen.module.scss';

const propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    definition: MicromagPropTypes.screenDefinition,
    screen: MicromagPropTypes.screen,
    renderContext: PropTypes.string,
    className: PropTypes.string,
    screenClassName: PropTypes.string,
    withBorder: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    width: null,
    height: null,
    definition: null,
    screen: null,
    renderContext: 'view',
    className: null,
    screenClassName: null,
    withBorder: false,
};

const Screen = ({
    width,
    height,
    screen,
    definition,
    renderContext,
    className,
    screenClassName,
    withBorder,
    children,
}) => {
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
                {screenSize.width > 0 && screenSize.height > 0 ? (
                    <ApiProvider baseUrl="http://localhost:58800">
                        <ScreenSizeProvider size={screenSize}>
                            <ScreenProvider
                                definition={definition}
                                data={screen}
                                renderContext={renderContext}
                            >
                                <div className={styles.screenContainer}>{children}</div>
                            </ScreenProvider>
                        </ScreenSizeProvider>
                    </ApiProvider>
                ) : null}
            </div>
        </div>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default Screen;
