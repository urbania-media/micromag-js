import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, easings } from '@micromag/core/utils';

import styles from '../../styles/menus/menu-container.module.scss';

const propTypes = {
    className: PropTypes.string,
    progressSpring: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    theme: MicromagPropTypes.viewerTheme,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    progressSpring: null,
    theme: null,
    children: null,
};

const ViewerMenuContainer = ({ className, progressSpring, theme: viewerTheme, children }) => {
    const { background = null } = viewerTheme || {};
    const { color: brandBackgroundColor = null } = background || {};
    const backgroundColorStyle = getStyleFromColor(brandBackgroundColor, 'backgroundColor');

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
            <animated.div
                className={styles.heightContainer}
                style={{
                    opacity: progressSpring,
                    transform: progressSpring.to((p) => `translateY(${(1 - p) * -2}rem)`),
                    pointerEvents: progressSpring.to((p) => (p < 0.25 ? 'none' : 'auto')),
                    zIndex: progressSpring.to((p) => Math.round(2 + p)),
                    ...backgroundColorStyle,
                }}
            >
                {children}
            </animated.div>
            <animated.div
                className={styles.backdrop}
                style={{
                    opacity: progressSpring.to((p) => easings.easeOutQuint(p)),
                }}
            />
        </div>
    );
};
ViewerMenuContainer.propTypes = propTypes;
ViewerMenuContainer.defaultProps = defaultProps;

export default ViewerMenuContainer;
