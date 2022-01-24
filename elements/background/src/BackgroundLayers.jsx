/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getLayersFromBackground } from '@micromag/core/utils';

import Background from './Background';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    background: PropTypes.oneOfType([
        MicromagPropTypes.backgroundElement,
        PropTypes.arrayOf(MicromagPropTypes.backgroundElement),
    ]),
    playing: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    loadingMode: PropTypes.string,
    shouldLoad: PropTypes.bool,
};

const defaultProps = {
    width: null,
    height: null,
    background: [],
    playing: false,
    children: null,
    className: null,
    loadingMode: 'lazy',
    shouldLoad: true,
};

const BackgroundLayers = ({ width, height, background, playing, children, className, loadingMode, shouldLoad }) => {
    const hasSize = width > 0 && height > 0;

    const layers = useMemo(() => getLayersFromBackground(background), [background]);
    const maxZIndex = layers.length;

    // color
    const containerStyle = {
        ...(hasSize
            ? {
                  width,
                  height,
              }
            : null),
    };

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
            <div className={styles.layers}>
                {layers.map(
                    (
                        { horizontalAlign = undefined, verticalAlign = undefined, ...layer },
                        index,
                    ) => (
                        <div
                            key={`background-${index}`}
                            className={classNames([
                                styles.layer,
                                {
                                    [styles.bottom]: verticalAlign === 'bottom',
                                    [styles.right]: horizontalAlign === 'right',
                                },
                            ])}
                            style={{
                                zIndex: maxZIndex - index,
                            }}
                        >
                            <Background
                                width={width}
                                height={height}
                                className={styles.background}
                                playing={playing}
                                horizontalAlign={horizontalAlign}
                                verticalAlign={verticalAlign}
                                loadingMode={loadingMode}
                                shouldLoad={shouldLoad}
                                {...layer}
                            />
                        </div>
                    ),
                )}
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

BackgroundLayers.propTypes = propTypes;
BackgroundLayers.defaultProps = defaultProps;

export default BackgroundLayers;
