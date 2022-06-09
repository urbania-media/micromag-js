import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Screen } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenComponent,
    renderContext: MicromagPropTypes.renderContext,
    screenState: PropTypes.string,
    current: PropTypes.bool,
    active: PropTypes.bool,
    mediaRef: PropTypes.func,
};

const defaultProps = {
    screen: null,
    renderContext: null,
    screenState: null,
    current: false,
    active: true,
    mediaRef: null,
};

const ViewerScreen = ({
    screen,
    renderContext,
    screenState,
    active,
    current,
    mediaRef,
}) =>
    screen !== null ? (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.active]: active,
                    [styles.current]: current,
                },
            ])}
            aria-hidden={current ? null : 'true'}
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
    ) : null;

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
