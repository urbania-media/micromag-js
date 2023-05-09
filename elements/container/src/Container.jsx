/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

const propTypes = {
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    containerRef: null,
    className: null,
    children: null,
};

function Container({ containerRef, width, height, className, children }) {
    const hasSize = width > 0 && height > 0;
    const containerStyle = hasSize
        ? {
              width,
              height,
          }
        : null;
    return (
        <div
            ref={containerRef}
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

export default React.forwardRef((props, ref) => <Container containerRef={ref} {...props} />);
