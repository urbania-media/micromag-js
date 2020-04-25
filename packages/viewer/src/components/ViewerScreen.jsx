import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Screen } from '@micromag/core/components';
import { useIsVisible } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenType,
    index: PropTypes.number,
    active: PropTypes.bool,
    visible: PropTypes.bool,
    onVisible: PropTypes.func,
};

const defaultProps = {
    screen: null,
    index: 0,
    active: false,
    visible: true,
    onVisible: null,
};

const ViewerScreen = ({ screen, index, visible: isVisible, active, onVisible }) => {
    const { ref, visible } = useIsVisible();

    useEffect(() => {
        if (visible && onVisible !== null) {
            // console.log('visible', index, screen.type);
            onVisible(index);
        }
    }, [visible]);
    // console.log(screen.type, visible, active);

    return screen !== null ? (
        <div ref={ref} className={styles.container}>
            <Screen screen={{ ...screen, visible: isVisible, active }} />
        </div>
    ) : null;
};

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
