import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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

function Container({ width, height, className, children }) {
    const hasSize = width > 0 && height > 0;
    const containerStyle = hasSize
        ? {
              width,
              height,
          }
        : null;

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
            {children}
        </div>
    );
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
