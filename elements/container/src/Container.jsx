import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    verticalAlign: PropTypes.oneOf(['top', 'center', 'bottom']),
    distribution: PropTypes.oneOf(['around', 'between']),
    maxRatio: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    verticalAlign: null,
    distribution: null,
    maxRatio: null,
    className: null,
    children: null,
};

const Container = ({
    width,
    height,
    verticalAlign,
    distribution,
    maxRatio,
    className,
    children,
}) => {
    const currentRatio = width / height;
    const maxWidth = maxRatio !== null && currentRatio > maxRatio ? height * maxRatio : null;

    const withVerticalAlign = verticalAlign !== null;
    const withDistribution = distribution !== null;
    const withVerticalContainer = withVerticalAlign || withDistribution;

    const containerStyle = {
        width,
        height,
    };

    const innerStyle = {
        width: maxWidth,
    };

    if (withVerticalContainer) {
        if (withDistribution) {
            innerStyle.justifyContent = `space-${distribution}`;
        } else {
            switch (verticalAlign) {
                default:
                case 'center':
                    innerStyle.justifyContent = 'center';
                    break;
                case 'top':
                    innerStyle.justifyContent = 'flex-start';
                    break;
                case 'bottom':
                    innerStyle.justifyContent = 'flex-end';
                    break;
            }
        }
    }

    // console.log(React.Children.map(children, child => child))

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.withVerticalContainer]: withVerticalContainer,
                },
            ])}
            style={containerStyle}
        >
            <div className={styles.inner} style={innerStyle}>
                {withVerticalContainer
                    ? React.Children.map(children, (child, childIndex) => (
                          <div
                              key={childIndex}
                              style={
                                  withDistribution
                                      ? {
                                            marginTop:
                                                verticalAlign === 'bottom' &&
                                                childIndex === children.length - 1
                                                    ? 'auto'
                                                    : null,
                                            marginBottom:
                                                verticalAlign === 'top' && childIndex === 0
                                                    ? 'auto'
                                                    : null,
                                        }
                                      : null
                              }
                          >
                              {child}
                          </div>
                      ))
                    : children}
            </div>
        </div>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
