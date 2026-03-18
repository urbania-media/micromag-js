/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import type { BackgroundElement } from '@micromag/core';
import { getLayersFromBackground } from '@micromag/core/utils';

import Background from './Background';

import styles from './styles.module.css';

interface BackgroundLayersProps {
    width?: number | null;
    height?: number | null;
    resolution?: number;
    background?: BackgroundElement | BackgroundElement[] | null;
    playing?: boolean;
    muted?: boolean;
    children?: React.ReactNode | null;
    className?: string | null;
    layerClassName?: string | null;
    backgroundClassName?: string | null;
    loadingMode?: string;
    mediaRef?: ((...args: unknown[]) => void | { current?: unknown }) | null;
    shouldLoad?: boolean;
    withoutVideo?: boolean;
    onPlayError?: boolean | null;
    qualityStartLevel?: number | null;
    onQualityLevelChange?: ((...args: unknown[]) => void) | null;
}

function BackgroundLayers({
    width = null,
    height = null,
    resolution = 1,
    background = null,
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
}: BackgroundLayersProps) {
    const hasSize = width !== null && height !== null && width > 0 && height > 0;

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
        <div className={classNames([styles.container, className])} style={containerStyle}>
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
                                layerClassName,
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
                                resolution={resolution}
                                className={classNames([
                                    styles.background,
                                    backgroundClassName,
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
