import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { easings } from '@micromag/core/utils';

import styles from '../../styles/menus/menu-container.module.scss';

const propTypes = {
    className: PropTypes.string,
    transitionProgress: PropTypes.number,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    transitionProgress: 0,
    children: null,
};

const ViewerMenuContainer = ({ className, transitionProgress, children }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        style={{ pointerEvents: 'none' }}
    >
        <div
            className={styles.heightContainer}
            style={{
                height: `${transitionProgress * 100}%`,
                pointerEvents: transitionProgress < 0.25 ? 'none' : 'auto',
                zIndex: Math.round(1 + transitionProgress),
            }}
        >
            <div
                className={styles.inner}
                style={{
                    paddingTop: `${3 * transitionProgress}rem`,
                    paddingBottom: `${0.5 * transitionProgress}rem`,
                }}
            >
                {children}
            </div>
        </div>
        <div
            className={styles.backdrop}
            style={{
                opacity: easings.easeOutQuint(transitionProgress),
            }}
        />
    </div>
);
ViewerMenuContainer.propTypes = propTypes;
ViewerMenuContainer.defaultProps = defaultProps;

export default ViewerMenuContainer;
