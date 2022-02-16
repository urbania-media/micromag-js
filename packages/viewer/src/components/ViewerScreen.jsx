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
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    onEnableInteraction: PropTypes.func,
    onDisableInteraction: PropTypes.func,
    getMediaRef: PropTypes.func,
};

const defaultProps = {
    screen: null,
    renderContext: null,
    screenState: null,
    current: false,
    active: true,
    onPrevious: null,
    onNext: null,
    onEnableInteraction: null,
    onDisableInteraction: null,
    getMediaRef: null,
};

const ViewerScreen = ({
    screen,
    renderContext,
    screenState,
    active,
    current,
    onPrevious,
    onNext,
    onEnableInteraction,
    onDisableInteraction,
    getMediaRef,
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
                onPrevious={onPrevious}
                onNext={onNext}
                onEnableInteraction={onEnableInteraction}
                onDisableInteraction={onDisableInteraction}
                getMediaRef={getMediaRef}
            />
        </div>
    ) : null;

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
