import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Screen } from '@micromag/core/components';

import HandTap from './partials/HandTap';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenComponent,
    renderContext: MicromagPropTypes.renderContext,
    screenState: PropTypes.string,
    current: PropTypes.bool,
    active: PropTypes.bool,
    mediaRef: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number,
    withNavigationHint: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    renderContext: null,
    screenState: null,
    current: false,
    active: true,
    mediaRef: null,
    width: null,
    height: null,
    scale: null,
    withNavigationHint: false,
    className: null,
};

function ViewerScreen({
    screen,
    renderContext,
    screenState,
    active,
    current,
    mediaRef,
    width,
    height,
    scale,
    withNavigationHint,
    className,
}) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                style={{
                    width,
                    height,
                    transform: scale !== null ? `scale(${scale})` : null,
                    transformOrigin: scale !== null ? '0 0' : null,
                }}
            >
                <Screen
                    screen={screen}
                    renderContext={renderContext}
                    screenState={screenState}
                    active={active}
                    current={current}
                    mediaRef={mediaRef}
                />
            </div>
            {withNavigationHint ? <HandTap className={styles.handTap} /> : null}
        </div>
    );
}

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
