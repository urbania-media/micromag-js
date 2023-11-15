/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getLayersFromBackground } from '@micromag/core/utils';

import Background from './Background';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    resolution: PropTypes.number,
    background: PropTypes.oneOfType([
        MicromagPropTypes.backgroundElement,
        PropTypes.arrayOf(MicromagPropTypes.backgroundElement),
    ]),
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    layerClassName: PropTypes.string,
    backgroundClassName: PropTypes.string,
    loadingMode: PropTypes.string,
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            current: PropTypes.any,
        }),
    ]),
    shouldLoad: PropTypes.bool,
    withoutVideo: PropTypes.bool,
};

const defaultProps = {
    width: null,
    height: null,
    resolution: 1,
    background: [],
    playing: false,
    muted: false,
    children: null,
    className: null,
    layerClassName: null,
    backgroundClassName: null,
    loadingMode: 'lazy',
    mediaRef: null,
    shouldLoad: true,
    withoutVideo: false,
};

const BackgroundLayers = ({
    width,
    height,
    resolution,
    background,
    playing,
    muted,
    children,
    className,
    layerClassName,
    backgroundClassName,
    loadingMode,
    mediaRef,
    shouldLoad,
    withoutVideo,
}) => {
    const hasSize = width > 0 && height > 0;

    const layers = useMemo(() => getLayersFromBackground(background), [background]);
    const maxZIndex = layers.length;

    if (layers.length === 0) {
        return null;
    }

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
                                    [layerClassName]: layerClassName !== null,
                                },
                            ])}
                            style={{
                                zIndex: maxZIndex - index,
                            }}
                        >
                            <Background
                                width={width}
                                height={height}
                                resolution={resolution}
                                className={classNames([
                                    styles.background,
                                    {
                                        [backgroundClassName]: backgroundClassName !== null,
                                    },
                                ])}
                                playing={playing}
                                muted={muted}
                                horizontalAlign={horizontalAlign}
                                verticalAlign={verticalAlign}
                                loadingMode={loadingMode}
                                shouldLoad={shouldLoad}
                                mediaRef={mediaRef}
                                withoutVideo={withoutVideo}
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
