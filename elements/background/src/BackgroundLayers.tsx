/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import type { BackgroundElement } from '@micromag/core';
import { getLayersFromBackground } from '@micromag/core/utils';

import Background from './Background';

import styles from './styles.module.css';

interface BackgroundLayersProps {
    width?: number;
    height?: number;
    resolution?: number;
    background?: BackgroundElement | BackgroundElement[];
    playing?: boolean;
    muted?: boolean;
    children?: React.ReactNode;
    className?: string;
    layerClassName?: string;
    backgroundClassName?: string;
    loadingMode?: string;
    mediaRef?: (...args: unknown[]) => void | { current?: unknown };
    shouldLoad?: boolean;
    withoutVideo?: boolean;
    onPlayError?: boolean;
    qualityStartLevel?: number;
    onQualityLevelChange?: (...args: unknown[]) => void;
}

function BackgroundLayers({
    width = null,
    height = null,
    resolution = 1,
    background = [],
    playing = false,
    muted = false,
    children = null,
    className = null,
    layerClassName = null,
    backgroundClassName = null,
    loadingMode = 'lazy',
    mediaRef = null,
    shouldLoad = true,
    withoutVideo = false,
    onPlayError = null,
    qualityStartLevel = null,
    onQualityLevelChange = null,
}) {
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
                                onPlayError={onPlayError}
                                qualityStartLevel={qualityStartLevel}
                                onQualityLevelChange={onQualityLevelChange}
                                {...layer}
                            />
                        </div>
                    ),
                )}
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default BackgroundLayers;
