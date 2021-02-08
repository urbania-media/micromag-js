import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StackProvider } from '@micromag/element-stack';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    horizontalAlign: PropTypes.oneOf(['left', 'center', 'right']),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    distribution: PropTypes.oneOf(['between', 'around', null]),
    fullscreen: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,// eslint-disable-line
};

const defaultProps = {
    width: null,
    height: null,
    horizontalAlign: 'left',
    verticalAlign: 'top',
    distribution: null,
    fullscreen: false,
    className: null,
    children: null,
    style: null,
};

const Layout = ({
    width,
    height,
    horizontalAlign,
    verticalAlign,
    distribution,
    fullscreen,
    className,
    children,
    style,
}) => {
    let justifyContent = null;
    if (distribution !== null) {
        justifyContent = `space-${distribution}`;
    } else if (verticalAlign === 'middle') {
        justifyContent = 'center';
    } else if (verticalAlign === 'bottom') {
        justifyContent = 'flex-end';
    }

    let alignItems = null;
    if (horizontalAlign === 'center') {
        alignItems = 'center';
    } else if (horizontalAlign === 'right') {
        alignItems = 'flex-end';
    }

    const finalStyle = {
        width,
        height,
        justifyContent,
        alignItems,
        ...style,
    };

    return (
        <StackProvider direction="vertical">
            <div
                className={classNames([
                    styles.container,
                    {
                        [styles.fullscreen]: fullscreen,
                        [className]: className !== null,
                    },
                ])}
                style={finalStyle}
            >
                {children}
            </div>
        </StackProvider>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
