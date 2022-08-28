import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useProgressTransition } from '@micromag/core/hooks';

import styles from '../../styles/menus/menu-container.module.scss';

const propTypes = {
    className: PropTypes.string,
    transitionProgress: PropTypes.number,
    immediate: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    transitionProgress: 0,
    immediate: false,
    children: null,
};

const ViewerMenuContainer = ({ className, transitionProgress, immediate, children }) => {
    const { styles: transitionStyles = {} } = useProgressTransition({
        value: transitionProgress,
        fn: (p) => ({
            height: `${p * 100}%`,
            padding: `${p * 0.5}rem 0.5rem`,
            pointerEvents: p < 0.25 ? 'none' : 'auto',
        }),
        params: {
            immediate,
            config: { tension: 400, friction: 35 },
        },
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ pointerEvents: 'none' }}
        >
            <div className={styles.heightContainer} style={transitionStyles}>
                <div className={styles.inner}>
                    {children}
                </div>
            </div>
        </div>
    );
};
ViewerMenuContainer.propTypes = propTypes;
ViewerMenuContainer.defaultProps = defaultProps;

export default ViewerMenuContainer;
