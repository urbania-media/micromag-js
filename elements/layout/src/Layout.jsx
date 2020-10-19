import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { LayoutProvider } from './LayoutContext';

import styles from './styles/layout.module.scss';

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    horizontalAlign: PropTypes.oneOf(['left', 'center', 'right']),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    distribution: PropTypes.oneOf(['space-between', 'space-around', null]),
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    horizontalAlign: 'left',
    verticalAlign: 'top',
    distribution: null,
    className: null,
    children: null,
};

const Layout = ({
    width,
    height,
    horizontalAlign,
    verticalAlign,
    distribution,
    className,
    children,
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

    const containerStyle = {
        width,
        height,
        justifyContent,
        alignItems,
    };

    return (
        <LayoutProvider direction="vertical">
            <div
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
                style={containerStyle}
            >
                {children}
            </div>
        </LayoutProvider>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
