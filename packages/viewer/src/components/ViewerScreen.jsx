import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Screen } from '@micromag/core/components';
import { useIsVisible } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/screen.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenType,
    index: PropTypes.number,
    onVisible: PropTypes.func,
};

const defaultProps = {
    screen: null,
    index: 0,
    onVisible: null,
};

const ViewerScreen = ({ screen, index, onVisible }) => {
    const { ref, visible } = useIsVisible();

    useEffect(() => {
        if (visible && onVisible !== null) {
            onVisible(index);
        }
    }, [visible]);

    return screen !== null ? (
        <div ref={ref} className={styles.container}>
            <Screen screen={screen} />
        </div>
    ) : null;
};

ViewerScreen.propTypes = propTypes;
ViewerScreen.defaultProps = defaultProps;

export default ViewerScreen;
