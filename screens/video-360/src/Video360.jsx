/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo360, ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    useScreenRenderContext,
    useScreenSize,
    useViewerContainer,
    useViewerContext,
    useViewerInteraction,
    useViewerNavigation,
    useViewerWebView,
} from '@micromag/core/contexts';
import {
    useActivityDetector,
    useAnimationFrame,
    useDebounce,
    useTrackScreenEvent,
    useTrackScreenMedia,
} from '@micromag/core/hooks';
import { getFooterProps, isFooterFilled, isHeaderFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import useThree from './useThree';

import styles from './video-360.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['full']),
    video: MicromagPropTypes.videoElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    preload: PropTypes.bool,
    type: PropTypes.string,
    spacing: PropTypes.number,
    mediaRef: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    video: null,
    header: null,
    footer: null,
    background: null,
    current: true,
    preload: true,
    type: null,
    spacing: 20,
    mediaRef: null,
    className: null,
};

const Video360Screen = ({
    layout, // eslint-disable-line
    video,
    header,
    footer,
    background,
    current,
    preload,
    type,
    spacing,
    mediaRef: customMediaRef,
    className,
}) => {
    const THREE = useThree();
    const trackScreenEvent = useTrackScreenEvent(type);
    const trackScreenMedia = useTrackScreenMedia('video_360');
    const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { gotoPreviousScreen, gotoNextScreen } = useViewerNavigation();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { width, height, landscape, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { open: openWebView } = useViewerWebView();

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || preload;
    const {
        media: videoMedia = null,
        closedCaptions = null,
        captions = null,
        withSeekBar = false,
        withControls = false,
        autoPlay = true,
        color = null,
        progressColor = null,
    } = video || {};

    const videoContainerRef = useRef();

    const {
        playing,
        muted,
        setControls,
        setControlsTheme,
        setControlsSuggestPlay,
        setMedia,
        setPlaying,
        showControls,
        hideControls,
        currentQualityLevel,
        setCurrentQualityLevel,
    } = usePlaybackContext();
    const mediaRef = useRef(null);

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        if (withControls || withSeekBar) {
            setControls(true);
            setControlsTheme({
                seekBarOnly: withSeekBar && !withControls,
                color,
                progressColor,
            });
        } else {
            setControls(false);
        }
        return () => {
            if (withControls || withSeekBar) {
                setControls(false);
            }
        };
    }, [current, withControls, setControls, withSeekBar, color, progressColor]);

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        setMedia(mediaRef.current);
        return () => {
            setMedia(null);
        };
    }, [current]);

    useEffect(() => {
        if (customMediaRef !== null) {
            customMediaRef(mediaRef.current);
        }
    }, [mediaRef.current]);

    useEffect(() => {
        if (current && autoPlay && !playing) {
            setPlaying(true);
        }
    }, [current, autoPlay]);

    const viewerContainer = useViewerContainer();
    const { detected: activityDetected } = useActivityDetector({
        element: viewerContainer,
        disabled: !isView,
        timeout: 2000,
    });
    const toggleControlsVisibility = useCallback(() => {
        if (activityDetected) {
            showControls();
        } else {
            hideControls();
        }
    }, [activityDetected, showControls, hideControls]);
    useDebounce(toggleControlsVisibility, activityDetected, 1000);

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);

    const onTimeUpdate = useCallback(
        (time) => {
            setCurrentTime(time);
        },
        [setDuration, duration],
    );

    const onProgressStep = useCallback(
        (step) => {
            trackScreenMedia(video, `progress_${Math.round(step * 100, 10)}%`);
        },
        [trackScreenMedia, video],
    );

    const onDurationChange = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onPlay = useCallback(
        ({ initial }) => {
            trackScreenMedia(video, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, video],
    );

    const onPause = useCallback(
        ({ midway }) => {
            trackScreenMedia(video, midway ? 'pause' : 'ended');
        },
        [trackScreenMedia, video],
    );

    const onSeeked = useCallback(
        (time) => {
            if (time > 0) {
                trackScreenMedia(video, 'seek');
            }
        },
        [trackScreenMedia, video],
    );

    const onEnded = useCallback(() => {
        if (current) {
            setPlaying(false);
        }
    }, [current, setPlaying]);

    // ------------------------------------

    const hasVideo = video !== null;

    const [ready, setReady] = useState(!hasVideo);

    // const transitionPlaying = current && ready;
    // const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, {
        isView,
        current,
        openWebView,
        isPreview,
        enableInteraction,
        disableInteraction,
    });

    const finalVideo = hasVideo
        ? {
              ...video,
              autoPlay: !isPreview && !isStatic && !isCapture && autoPlay && current,
          }
        : null;

    const {
        metadata: videoMetadata = null,
        url: videoUrl = null,
        thumbnail_url: thumbnailUrl = null,
    } = videoMedia || {};
    const hasVideoUrl = videoUrl !== null;
    const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};
    const hasThumbnail = thumbnailUrl !== null;
    const [posterReady, setPosterReady] = useState(!hasThumbnail);

    const withVideoSphere = hasVideoUrl && (isView || isEdit) && !isCapture && !isStatic;

    const { width: resizedVideoWidth, height: resizedVideoHeight } = getSizeWithinBounds(
        videoWidth,
        videoHeight,
        width,
        height,
        { cover: true },
    );
    const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
    const resizedVideoTop = -(resizedVideoHeight - height) / 2;

    useEffect(() => {
        setReady(!hasVideoUrl);
    }, [videoUrl, hasVideoUrl, setReady]);

    useEffect(() => {
        setPosterReady(!hasThumbnail);
    }, [thumbnailUrl, hasThumbnail, setPosterReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const onPosterLoaded = useCallback(() => {
        setPosterReady(true);
    }, [posterReady]);

    // 3D layer  --------------------------

    const canvasRef = useRef(null);
    const camera = useRef(null);
    const scene = useRef(null);
    const renderer = useRef(null);
    const lon = useRef(0);
    const lat = useRef(0);
    const phi = useRef(0);
    const theta = useRef(0);
    const distance = useRef(50);
    const pointerDown = useRef(false);
    const pointerDownX = useRef(0);
    const pointerDownY = useRef(0);
    const pointerLon = useRef(0);
    const pointerLat = useRef(0);

    // render 3D frame

    const render3D = useCallback(() => {
        if (THREE === null) {
            return;
        }

        const { MathUtils } = THREE;
        lat.current = Math.max(-85, Math.min(85, lat.current));
        phi.current = MathUtils.degToRad(90 - lat.current);
        theta.current = MathUtils.degToRad(lon.current);

        camera.current.position.x =
            distance.current * Math.sin(phi.current) * Math.cos(theta.current);
        camera.current.position.y = distance.current * Math.cos(phi.current);
        camera.current.position.z =
            distance.current * Math.sin(phi.current) * Math.sin(theta.current);

        camera.current.lookAt(0, 0, 0);

        renderer.current.render(scene.current, camera.current);
    }, []);

    // Init 3D layer

    useEffect(() => {
        if (THREE !== null && hasVideoUrl && withVideoSphere) {
            const {
                Scene,
                PerspectiveCamera,
                SphereBufferGeometry,
                VideoTexture,
                MeshBasicMaterial,
                Mesh,
                WebGLRenderer,
            } = THREE;
            const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = canvasRef.current;
            camera.current = new PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 1100);
            scene.current = new Scene();

            const geometry = new SphereBufferGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1);

            const { current: videoElement = null } = mediaRef || {};

            const videoTexture = new VideoTexture(videoElement);

            const videoMaterial = new MeshBasicMaterial({ map: videoTexture });

            const mesh = new Mesh(geometry, videoMaterial);
            scene.current.add(mesh);

            renderer.current = new WebGLRenderer({ canvas: canvasRef.current });
            renderer.current.setPixelRatio(
                typeof window !== 'undefined' ? window.devicePixelRatio : 1,
            );
            renderer.current.setSize(canvasWidth, canvasHeight);
            render3D();
        }

        return () => {
            if (withVideoSphere) {
                camera.current = null;
                scene.current = null;
                renderer.current = null;
            }
        };
    }, [hasVideoUrl, withVideoSphere, render3D]);

    useAnimationFrame(render3D, { disabled: !withVideoSphere });

    // Resize 3D layer

    useEffect(() => {
        if (camera.current !== null && renderer.current !== null) {
            camera.current.aspect = width / height;
            camera.current.updateProjectionMatrix();
            renderer.current.setSize(width, height);
        }
    }, [width, height]);

    // Pointer interaction
    const togglePlayTimeout = useRef(null);
    const onPointerDown = useCallback(
        (e) => {
            pointerDown.current = true;
            pointerDownX.current = e.clientX;
            pointerDownY.current = e.clientY;
            pointerLon.current = lon.current;
            pointerLat.current = lat.current;
            // if (togglePlayTimeout.current !== null) {
            //     clearTimeout(togglePlayTimeout.current);
            // }
            // togglePlayTimeout.current = setTimeout(() => {
            //     togglePlay();
            //     togglePlayTimeout.current = null;
            // }, 300);
        },
        [
            /* togglePlay */
        ],
    );

    const pixelsMoved = useRef(0);
    const lastPointerClient = useRef(null);
    const pixelsMovedTracked = useRef(false);
    const onPointerMove = useCallback(
        (e) => {
            if (pointerDown.current) {
                const { clientX = null, clientY = null } = e || {};
                const downDeltaX = pointerDownX.current - clientX;
                const downDeltaY = pointerDownY.current - clientY;
                lon.current = downDeltaX * 0.2 + pointerLon.current;
                lat.current = downDeltaY * 0.2 + pointerLat.current;

                const { x: lastX = clientX, y: lastY = clientY } = lastPointerClient.current || {};
                const deltaX = Math.abs(lastX - clientX) || 0;
                const deltaY = Math.abs(lastY - clientY) || 0;
                pixelsMoved.current += deltaX + deltaY;

                if (!pixelsMovedTracked.current && pixelsMoved.current > Math.min(width, height)) {
                    trackScreenEvent('drag_sphere', video.name);
                    pixelsMovedTracked.current = true;
                }

                lastPointerClient.current = { x: clientX, y: clientY };

                if (Math.abs(downDeltaX) > 3 || Math.abs(downDeltaY) > 3) {
                    if (togglePlayTimeout.current !== null) {
                        clearTimeout(togglePlayTimeout.current);
                        togglePlayTimeout.current = null;
                    }
                }
            }
        },
        [width, height, trackScreenEvent, video],
    );

    const onPointerUp = useCallback(
        (e) => {
            const videoContainer = videoContainerRef.current;
            if (pointerDown.current && videoContainer !== null) {
                const distX = Math.abs(pointerDownX.current - e.clientX);
                const distY = Math.abs(pointerDownY.current - e.clientY);

                const pixelsMovedTolerance = 3;
                const tapNextScreenWidthPercent = 0.5;
                const canTapToNavigate = !landscape && togglePlayTimeout.current !== null;
                const validNavigateTap =
                    canTapToNavigate &&
                    distX < pixelsMovedTolerance &&
                    distY < pixelsMovedTolerance;

                if (validNavigateTap) {
                    const { left: containerX = 0, width: containerWidth } =
                        videoContainer.getBoundingClientRect();
                    const hasTappedLeft =
                        e.clientX - containerX < containerWidth * (1 - tapNextScreenWidthPercent);

                    if (hasTappedLeft) {
                        if (gotoPreviousScreen !== null) {
                            gotoPreviousScreen();
                        }
                    } else if (gotoNextScreen !== null) {
                        gotoNextScreen();
                    }
                }

                if (togglePlayTimeout.current !== null) {
                    clearTimeout(togglePlayTimeout.current);
                    togglePlayTimeout.current = null;
                }
            }
            pointerDown.current = false;
        },
        [gotoPreviousScreen, gotoNextScreen, landscape],
    );

    const onPlayError = useCallback(() => {
        if (isView && playing && current && hasVideoUrl && autoPlay) {
            setPlaying(false);
            setControlsSuggestPlay(true);
        }
    }, [isView, current, playing, hasVideoUrl, autoPlay, setPlaying, setControlsSuggestPlay]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.showVideo]: isPreview || isStatic || isCapture,
                },
            ])}
            data-screen-ready={((isStatic || isCapture) && posterReady) || ready}
        >
            <Container width={width} height={height} className={styles.content}>
                {withVideoSphere ? (
                    <div
                        ref={videoContainerRef}
                        className={styles.videoContainer}
                        style={{
                            width: resizedVideoWidth,
                            height: resizedVideoHeight,
                            left: resizedVideoLeft,
                            top: resizedVideoTop,
                        }}
                    >
                        <Video
                            {...finalVideo}
                            mediaRef={mediaRef}
                            className={styles.video}
                            paused={!current || !playing}
                            muted={muted}
                            withoutCors
                            onReady={onVideoReady}
                            onPlay={onPlay}
                            onPause={onPause}
                            onTimeUpdate={onTimeUpdate}
                            onProgressStep={onProgressStep}
                            onDurationChange={onDurationChange}
                            onSeeked={onSeeked}
                            onEnded={onEnded}
                            onPosterLoaded={onPosterLoaded}
                            onPlayError={onPlayError}
                            setPlaying={setPlaying}
                            focusable={current && isView}
                            shouldLoad={mediaShouldLoad}
                            qualityStartLevel={currentQualityLevel}
                            onQualityLevelChange={setCurrentQualityLevel}
                        />
                    </div>
                ) : null}
                <div className={styles.inner}>
                    <ScreenElement
                        key="video"
                        placeholder={
                            <PlaceholderVideo360
                                className={styles.placeholder}
                                width="100%"
                                height="100%"
                            />
                        }
                        emptyClassName={styles.empty}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Video 360"
                                description="Video 360 placeholder"
                            />
                        }
                        isEmpty={!withVideoSphere}
                    >
                        {!isPlaceholder && hasHeader ? (
                            <div
                                key="header"
                                className={styles.header}
                                style={{
                                    paddingTop: spacing / 2,
                                    paddingLeft: spacing,
                                    paddingRight: spacing,
                                    transform: !isPreview
                                        ? `translate(0, ${viewerTopHeight}px)`
                                        : null,
                                }}
                            >
                                <Header {...header} />
                            </div>
                        ) : null}

                        {withVideoSphere ? (
                            <>
                                <canvas ref={canvasRef} className={styles.canvas} />
                                <button
                                    className={styles.canvasButton}
                                    type="button"
                                    aria-label="canvas-interaction"
                                    onPointerDown={onPointerDown}
                                    onPointerMove={onPointerMove}
                                    onPointerUp={onPointerUp}
                                    tabIndex={current && isView ? null : '-1'}
                                />
                            </>
                        ) : (
                            <div
                                className={styles.videoContainer}
                                style={{
                                    width: resizedVideoWidth,
                                    height: resizedVideoHeight,
                                    left: resizedVideoLeft,
                                    top: resizedVideoTop,
                                }}
                            >
                                <Image
                                    className={styles.video}
                                    media={{
                                        url: thumbnailUrl,
                                        metadata: { width: videoWidth, height: videoHeight },
                                    }}
                                    width={resizedVideoWidth}
                                    height={resizedVideoHeight}
                                    resolution={resolution}
                                />
                            </div>
                        )}
                    </ScreenElement>
                    {!isPlaceholder ? (
                        <div
                            key="bottom-content"
                            className={styles.bottom}
                            style={{
                                transform:
                                    current && !isPreview
                                        ? `translate(0, -${viewerBottomHeight}px)`
                                        : null,
                                paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                                paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                                paddingBottom: spacing / 2,
                                paddingTop: 0,
                            }}
                        >
                            {(closedCaptions !== null || captions !== null) &&
                            !isPreview &&
                            !isCapture &&
                            !isStatic ? (
                                <ClosedCaptions
                                    className={styles.closedCaptions}
                                    media={closedCaptions}
                                    {...captions}
                                    currentTime={currentTime}
                                />
                            ) : null}
                            {hasFooter ? (
                                <Footer {...footerProps} className={styles.callToAction} />
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

Video360Screen.propTypes = propTypes;
Video360Screen.defaultProps = defaultProps;

export default Video360Screen;
