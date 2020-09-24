import React from 'react';
import PropTypes from 'prop-types';

import { Screen } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenType,
    active: PropTypes.bool,
    visible: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
};

const defaultProps = {
    screen: null,
    active: false,
    visible: true,
    renderFormat: null,
};

const ViewerScreen = ({ screen, visible: isVisible, active, renderFormat }) => {
    
    return screen !== null ? (
        <div className={styles.container}>
            <Screen
                screen={screen}
                visible={isVisible}
                active={active}
                renderFormat={renderFormat}
            />
        </div>
    ) : null;
};

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
