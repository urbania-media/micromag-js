import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor, easings } from '@micromag/core/utils';

import styles from '../../styles/menus/menu-container.module.scss';

const propTypes = {
    className: PropTypes.string,
    transitionProgress: PropTypes.number,
    theme: MicromagPropTypes.viewerTheme,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    transitionProgress: 0,
    theme: null,
    children: null,
};

const ViewerMenuContainer = ({ className, transitionProgress, theme: viewerTheme, children }) => {
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
            <div
                className={styles.heightContainer}
                style={{
                    height: `${transitionProgress * 100}%`,
                    pointerEvents: transitionProgress < 0.25 ? 'none' : 'auto',
                    zIndex: Math.round(2 + transitionProgress),
                    ...backgroundColorStyle,
                }}
            >
                {children}
            </div>
            <div
                className={styles.backdrop}
                style={{
                    opacity: easings.easeOutQuint(transitionProgress),
                }}
            />
        </div>
    );
};
ViewerMenuContainer.propTypes = propTypes;
ViewerMenuContainer.defaultProps = defaultProps;

export default ViewerMenuContainer;
