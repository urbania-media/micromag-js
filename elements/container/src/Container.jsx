import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useScreenRenderContext } from '../../video/node_modules/@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    className: null,
    children: null,
};

const Container = ({
    width,
    height,
    className,
    children,
}) => {
    const { isStatic } = useScreenRenderContext();

    const containerStyle = !isStatic ? {
        width,
        height,
    } : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerStyle}
        >
            { children }
        </div>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
