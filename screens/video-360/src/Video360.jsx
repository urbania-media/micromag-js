/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions, ScreenElement } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { useAnimationFrame } from '@micromag/core/hooks';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';
import { getSizeWithinBounds } from '@folklore/size';

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

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['full']),
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    video: null,
    background: null,
    current: true,
    active: true,
    transitions: null,
    className: null,
};

const Video360Screen = ({
    layout, // eslint-disable-line
    video,
    background,
    current,
    active,
    transitions,
    className,
}) => {
    // Media API --------------------------

    const apiRef = useRef();
    const { togglePlay, toggleMute, seek } = apiRef.current || {};

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const onTimeUpdate = useCallback((time) => {
        setCurrentTime(time);
    }, []);

    const onDurationChanged = useCallback((dur) => {
        setDuration(dur);
    }, []);

    const onPlayChanged = useCallback((isPlaying) => {
        setPlaying(isPlaying);
    }, []);

    const onMuteChanged = useCallback((isMuted) => {
        setMuted(isMuted);
    }, []);

    // ------------------------------------

    const { width, height } = useScreenSize();
    const { isEdit, isPlaceholder, isView, isPreview } = useScreenRenderContext();

    const hasVideo = video !== null;
    const withVideoSphere = hasVideo && (isView || isEdit);
    const [ready, setReady] = useState(!hasVideo);
    const transitionPlaying = current && ready;

    const finalVideo = hasVideo ? { ...video, autoPlay: isPreview ? false : video.autoPlay } : null;
    const { media: videoMedia = null, closedCaptions = null, withSeekBar = false } =
        finalVideo || {};

    const { metadata: videoMetadata = null } = videoMedia || {};
    const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};

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
        setReady(false);
    }, [video, setReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

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
    const pointerX = useRef(0);
    const pointerY = useRef(0);
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
            renderer.current.setPixelRatio(window.devicePixelRatio);
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
    }, [width, height, render3D]);

    // Pointer interaction

    const onPointerDown = useCallback((e) => {
        pointerDown.current = true;
        pointerX.current = e.clientX;
        pointerY.current = e.clientY;
        pointerLon.current = lon.current;
        pointerLat.current = lat.current;
    }, []);

    const onPointerMove = useCallback((e) => {
        if (pointerDown.current) {
            lon.current = (pointerX.current - e.clientX) * 0.2 + pointerLon.current;
            lat.current = (pointerY.current - e.clientY) * 0.2 + pointerLat.current;
        }
    }, []);

    const onPointerUp = useCallback(() => {
        pointerDown.current = false;
    }, []);

    // Building elements ------------------

    const items = [
        <ScreenElement
            key="video"
            placeholder={
                <PlaceholderVideo className={styles.placeholder} width="100%" height="100%" />
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
                    disabled={!isView && !isEdit}
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
                {closedCaptions !== null ? (
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
            </div>
        ) : null,
    ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPreview]: isPreview,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height}>
                {hasVideo ? (
                    <div
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
                            onPlayChanged={onPlayChanged}
                            onMuteChanged={onMuteChanged}
                            onTimeUpdate={onTimeUpdate}
                            onDurationChanged={onDurationChanged}
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
