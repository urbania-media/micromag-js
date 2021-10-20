import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Screen } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenComponent,
    renderContext: MicromagPropTypes.renderContext,
    current: PropTypes.bool,
    active: PropTypes.bool,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    onEnableInteraction: PropTypes.func,
    onDisableInteraction: PropTypes.func,
};

const defaultProps = {
    screen: null,
    renderContext: null,
    current: false,
    active: true,
    onPrevious: null,
    onNext: null,
    onEnableInteraction: null,
    onDisableInteraction: null,
};

const ViewerScreen = ({
    screen,
    renderContext,
    active,
    current,
    onPrevious,
    onNext,
    onEnableInteraction,
    onDisableInteraction,
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
                active={active}
                current={current}
                onPrevious={onPrevious}
                onNext={onNext}
                onEnableInteraction={onEnableInteraction}
                onDisableInteraction={onDisableInteraction}
            />
        </div>
    ) : null;

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
