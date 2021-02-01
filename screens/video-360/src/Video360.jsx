/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
    Scene,
    PerspectiveCamera,
    SphereBufferGeometry,
    VideoTexture,
    MeshBasicMaterial,
    Mesh,
    WebGLRenderer,
    MathUtils,
} from 'three';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo360, Transitions, ScreenElement } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { useAnimationFrame, useTrackScreenEvent, useTrackScreenMedia } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['full']),
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    video: null,
    background: null,
    current: true,
    transitions: null,
    onPrevious: null,
    onNext: null,
    type: null,
    className: null,
};

const Video360Screen = ({
    layout, // eslint-disable-line
    video,
    background,
    current,
    transitions,
    onPrevious,
    onNext,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
    const trackScreenMedia = useTrackScreenMedia('video_360');

    const { width, height, landscape } = useScreenSize();

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);

    const videoContainerRef = useRef();
    const apiRef = useRef();
    const { togglePlay, toggleMute, seek, pause } = apiRef.current || {};

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

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

    const onDurationChanged = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onPlay = useCallback(
        ({ initial }) => {
            setPlaying(true);
            trackScreenMedia(video, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, video],
    );

    const onPause = useCallback(
        ({ midway }) => {
            setPlaying(false);
            trackScreenMedia(video, midway ? 'pause' : 'ended');
        },
        [trackScreenMedia, video],
    );

    const onVolumeChanged = useCallback(
        (isMuted) => {
            setMuted(isMuted);
            trackScreenMedia(video, isMuted ? 'mute' : 'unmute');
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

    useEffect(() => {
        if (!current && playing) {
            pause();
        }
    }, [playing, current]);

    // ------------------------------------

    const hasVideo = video !== null;
    const withVideoSphere = hasVideo && (isView || isEdit) && !isCapture && !isStatic;
    const [ready, setReady] = useState(!hasVideo);

    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;

    const finalVideo = hasVideo
        ? { ...video, autoPlay: isPreview || isStatic || isCapture ? false : video.autoPlay }
        : null;
    const { media: videoMedia = null, closedCaptions = null, withSeekBar = false } =
        finalVideo || {};

    const {
        metadata: videoMetadata = null,
        url: videoUrl = null,
        thumbnail_url: thumbnailUrl = null,
    } = videoMedia || {};
    const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};
    const hasThumbnail = thumbnailUrl !== null;
    const [posterReady, setPosterReady] = useState(!hasThumbnail);

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
        setReady(!hasVideo);
    }, [videoUrl, hasVideo, setReady]);

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
        if (withVideoSphere) {
            const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = canvasRef.current;
            camera.current = new PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 1100);
            scene.current = new Scene();

            const geometry = new SphereBufferGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1);

            const { mediaRef: videoMediaRef = null } = apiRef.current || {};
            const { current: videoElement = null } = videoMediaRef || {};

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
    }, [withVideoSphere, render3D]);

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

    const onPointerDown = useCallback((e) => {
        pointerDown.current = true;
        pointerDownX.current = e.clientX;
        pointerDownY.current = e.clientY;
        pointerLon.current = lon.current;
        pointerLat.current = lat.current;
    }, []);

    const pixelsMoved = useRef(0);
    const lastPointerClient = useRef(null);
    const pixelsMovedTracked = useRef(false);
    const onPointerMove = useCallback(
        (e) => {
            if (pointerDown.current) {
                const { clientX = null, clientY = null } = e || {};
                const downDeltaX = pointerDownX.current - clientX;
                const downDeltaY = pointerDownY.current - clientY;
                lon.current = downDeltaX * (landscape ? 0.1 : 0.2) + pointerLon.current;
                lat.current = downDeltaY * (landscape ? 0.1 : 0.2) + pointerLat.current;

                const { x: lastX = clientX, y: lastY = clientY } = lastPointerClient.current || {};
                const deltaX = Math.abs(lastX - clientX) || 0;
                const deltaY = Math.abs(lastY - clientY) || 0;
                pixelsMoved.current += deltaX + deltaY;

                if (!pixelsMovedTracked.current && pixelsMoved.current > Math.min(width, height)) {
                    trackScreenEvent('drag_sphere', video.name);
                    pixelsMovedTracked.current = true;
                }

                lastPointerClient.current = { x: clientX, y: clientY };
            }
        },
        [landscape, width, height, trackScreenEvent, video],
    );

    const onPointerUp = useCallback(
        (e) => {
            const videoContainer = videoContainerRef.current;
            if (pointerDown.current && videoContainer !== null) {
                const distX = Math.abs(pointerDownX.current - e.clientX);
                const distY = Math.abs(pointerDownY.current - e.clientY);

                const pixelsMovedTolerance = 3;
                const tapNextScreenWidthPercent = 0.5;

                if (distX < pixelsMovedTolerance && distY < pixelsMovedTolerance) {
                    const {
                        left: containerX = 0,
                        width: containerWidth,
                    } = videoContainer.getBoundingClientRect();
                    const hasTappedLeft =
                        e.clientX - containerX < containerWidth * (1 - tapNextScreenWidthPercent);

                    if (hasTappedLeft) {
                        if (onPrevious !== null) {
                            onPrevious();
                        }
                    } else if (onNext !== null) {
                        onNext();
                    }
                }
            }
            pointerDown.current = false;
        },
        [onPrevious, onNext],
    );

    // Building elements ------------------

    const items = [
        <ScreenElement
            key="video"
            placeholder={
                <PlaceholderVideo360 className={styles.placeholder} width="100%" height="100%" />
            }
            emptyClassName={styles.empty}
            emptyLabel={
                <FormattedMessage defaultMessage="Video 360" description="Video 360 placeholder" />
            }
            isEmpty={!hasVideo}
        >
            {hasVideo ? (
                <Transitions
                    playing={transitionPlaying}
                    transitions={transitions}
                    disabled={transitionDisabled}
                    fullscreen
                >
                    <canvas ref={canvasRef} className={styles.canvas} />
                    <button
                        className={styles.canvasButton}
                        type="button"
                        aria-label="canvas-interaction"
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                    />
                </Transitions>
            ) : null}
        </ScreenElement>,
        !isPlaceholder ? (
            <div className={styles.bottomContent}>
                <Transitions
                    playing={transitionPlaying}
                    transitions={transitions}
                    disabled={transitionDisabled}
                >
                    {closedCaptions !== null && !isPreview && !isCapture && !isStatic ? (
                        <ClosedCaptions
                            className={styles.closedCaptions}
                            media={closedCaptions}
                            currentTime={currentTime}
                        />
                    ) : null}
                    <MediaControls
                        className={styles.mediaControls}
                        withSeekBar={withSeekBar}
                        playing={playing}
                        muted={muted}
                        currentTime={currentTime}
                        duration={duration}
                        onTogglePlay={togglePlay}
                        onToggleMute={toggleMute}
                        onSeek={seek}
                    />
                </Transitions>
            </div>
        ) : null,
    ];

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
            {!isPlaceholder ? (
                <Background
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                />
            ) : null}
            <Container width={width} height={height}>
                {hasVideo ? (
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
                            ref={apiRef}
                            className={styles.video}
                            onReady={onVideoReady}
                            onPlay={onPlay}
                            onPause={onPause}
                            onTimeUpdate={onTimeUpdate}
                            onProgressStep={onProgressStep}
                            onDurationChanged={onDurationChanged}
                            onSeeked={onSeeked}
                            onVolumeChanged={onVolumeChanged}
                            onPosterLoaded={onPosterLoaded}
                        />
                    </div>
                ) : null}
                <div className={styles.content}>{items}</div>
            </Container>
        </div>
    );
};

Video360Screen.propTypes = propTypes;
Video360Screen.defaultProps = defaultProps;

export default React.memo(Video360Screen);
