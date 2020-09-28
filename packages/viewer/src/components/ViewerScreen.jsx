import React from 'react';
import PropTypes from 'prop-types';

import { Screen } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenType,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
};

const defaultProps = {
    screen: null,
    current: false,
    active: true,
    renderFormat: null,
};

const ViewerScreen = ({ screen, active, current, renderFormat }) => {
    
    return screen !== null ? (
        <div className={styles.container}>
            <Screen
                screen={screen}
                visible={active}
                active={current}
                renderFormat={renderFormat}
            />
        </div>
    ) : null;
};

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
