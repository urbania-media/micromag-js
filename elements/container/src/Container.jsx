/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.css';

const propTypes = {
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.shape({}),
    className: PropTypes.string,
    children: PropTypes.node,
};

function Container({ containerRef = null, width, height, style = null, className = null, children = null }) {
    const hasSize = width > 0 && height > 0;
    const containerStyle = hasSize
        ? {
              width,
              height,
              ...style,
          }
        : style;

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

export default React.forwardRef((props, ref) => <Container containerRef={ref} {...props} />);
