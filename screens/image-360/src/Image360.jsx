/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import 'whatwg-fetch';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo360, Transitions, ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerNavigation,
    useViewerContext,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useAnimationFrame, useTrackScreenEvent } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';

import useThree from './useThree';

import styles from './image-360.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['full']),
    image: MicromagPropTypes.imageMedia,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    type: PropTypes.string,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    image: null,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    type: null,
    spacing: 20,
    className: null,
};

const Image360Screen = ({
    layout, // eslint-disable-line
    image,
    background,
    callToAction,
    current,
    active,
    transitions,
    type,
    spacing,
    className,
}) => {
    const THREE = useThree();
    const trackScreenEvent = useTrackScreenEvent(type);

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { width, height, landscape, resolution } = useScreenSize();
    const { gotoPreviousScreen, gotoNextScreen } = useViewerNavigation();
    const { open: openWebView } = useViewerWebView();
    const { bottomHeight: viewerBottomHeight, bottomSidesWidth: viewerBottomSidesWidth } =
        useViewerContext();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const canvasContainerRef = useRef();

    // ------------------------------------

    const hasMedia = image !== null;
    const { active: hasCallToAction = false } = callToAction || {};

    const [ready, setReady] = useState(!hasMedia);

    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const {
        metadata: imageMetadata = null,
        url: imageUrl = null,
        thumbnail_url: thumbnailUrl = null,
    } = image || {};
    const hasMediaUrl = imageUrl !== null;
    const { width: imageWidth = 0, height: imageHeight = 0 } = imageMetadata || {};
    const hasThumbnail = thumbnailUrl !== null;
    const [posterReady, setPosterReady] = useState(!hasThumbnail);

    const withSphere = hasMediaUrl && (isView || isEdit) && !isCapture && !isStatic;

    const { width: resizedImageWidth, height: resizedImageHeight } = getSizeWithinBounds(
        imageWidth,
        imageHeight,
        width,
        height,
        { cover: true },
    );
    const resizedImageLeft = -(resizedImageWidth - width) / 2;
    const resizedImageTop = -(resizedImageHeight - height) / 2;

    useEffect(() => {
        setReady(!hasMediaUrl);
    }, [imageUrl, hasMediaUrl, setReady]);

    useEffect(() => {
        setPosterReady(!hasThumbnail);
    }, [thumbnailUrl, hasThumbnail, setPosterReady]);

    // 3D layer  --------------------------

    const canvasRef = useRef(null);
    const camera = useRef(null);
    const scene = useRef(null);
    const renderer = useRef(null);
    const lon = useRef(0);
    const lat = useRef(0);
    const phi = useRef(0);
    const theta = useRef(0);
    // const distance = useRef(50);
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
        // const { MathUtils } = THREE;
        // lat.current = Math.max(-85, Math.min(85, lat.current));
        // phi.current = MathUtils.degToRad(90 - lat.current);
        // theta.current = MathUtils.degToRad(lon.current);

        // camera.current.position.x =
        //     distance.current * Math.sin(phi.current) * Math.cos(theta.current);
        // camera.current.position.y = distance.current * Math.cos(phi.current);
        // camera.current.position.z =
        //     distance.current * Math.sin(phi.current) * Math.sin(theta.current);

        // camera.current.lookAt(0, 0, 0);

        lat.current = Math.max(-85, Math.min(85, lat.current));
        phi.current = THREE.MathUtils.degToRad(90 - lat.current);
        theta.current = THREE.MathUtils.degToRad(lon.current);

        const x = 500 * Math.sin(phi.current) * Math.cos(theta.current);
        const y = 500 * Math.cos(phi.current);
        const z = 500 * Math.sin(phi.current) * Math.sin(theta.current);

        camera.current.lookAt(x, y, z);

        renderer.current.render(scene.current, camera.current);
    }, [THREE]);

    // Init 3D layer

    useEffect(() => {
        if (THREE !== null && hasMediaUrl && withSphere) {
            const {
                Scene,
                PerspectiveCamera,
                SphereBufferGeometry,
                MeshBasicMaterial,
                Mesh,
                WebGLRenderer,
                TextureLoader,
            } = THREE;
            const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = canvasRef.current;
            camera.current = new PerspectiveCamera(50, canvasWidth / canvasHeight, 1, 1100);
            scene.current = new Scene();

            const geometry = new SphereBufferGeometry(
                500,
                60,
                40,
                0,
                Math.PI * 2,
                Math.PI / 3,
                Math.PI / 3,
            );
            geometry.scale(-1, 1, 1);

            const texture = new TextureLoader().load(imageUrl);

            const material = new MeshBasicMaterial({ map: texture });

            const mesh = new Mesh(geometry, material);
            scene.current.add(mesh);

            renderer.current = new WebGLRenderer({ canvas: canvasRef.current });
            renderer.current.setPixelRatio(
                typeof window !== 'undefined' ? window.devicePixelRatio : 1,
            );
            renderer.current.setSize(canvasWidth, canvasHeight);
            render3D();
        }

        return () => {
            if (withSphere) {
                camera.current = null;
                scene.current = null;
                renderer.current = null;
            }
        };
    }, [hasMediaUrl, withSphere, render3D, THREE]);

    useAnimationFrame(render3D, { disabled: !withSphere || THREE === null });

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
                lon.current = downDeltaX * 0.2 + pointerLon.current;
                lat.current = downDeltaY * 0.2 + pointerLat.current;

                const { x: lastX = clientX, y: lastY = clientY } = lastPointerClient.current || {};
                const deltaX = Math.abs(lastX - clientX) || 0;
                const deltaY = Math.abs(lastY - clientY) || 0;
                pixelsMoved.current += deltaX + deltaY;

                if (!pixelsMovedTracked.current && pixelsMoved.current > Math.min(width, height)) {
                    trackScreenEvent('drag_sphere');
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
        [width, height, trackScreenEvent],
    );

    const onPointerUp = useCallback(
        (e) => {
            const canvasContainer = canvasContainerRef.current;
            if (pointerDown.current && canvasContainer !== null) {
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
                        canvasContainer.getBoundingClientRect();
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

    // Building elements ------------------

    const items = [
        <ScreenElement
            key="video"
            placeholder={
                <PlaceholderVideo360 className={styles.placeholder} width="100%" height="100%" />
            }
            emptyClassName={styles.empty}
            emptyLabel={
                <FormattedMessage defaultMessage="Image 360" description="Image 360 placeholder" />
            }
            isEmpty={!withSphere}
        >
            <Transitions
                playing={transitionPlaying}
                transitions={transitions}
                disabled={transitionDisabled}
                fullscreen
            >
                {withSphere ? (
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
                            width: resizedImageWidth,
                            height: resizedImageHeight,
                            left: resizedImageLeft,
                            top: resizedImageTop,
                        }}
                    >
                        <Image
                            className={styles.video}
                            media={{
                                url: thumbnailUrl,
                                metadata: { width: imageWidth, height: imageHeight },
                            }}
                            width={resizedImageWidth}
                            height={resizedImageHeight}
                            resolution={resolution}
                            shouldLoad={mediaShouldLoad}
                        />
                    </div>
                )}
            </Transitions>
        </ScreenElement>,
        !isPlaceholder && hasCallToAction ? (
            <div
                key="callToAction"
                className={styles.callToAction}
                style={{
                    transform:
                        current && !isPreview ? `translate(0, -${viewerBottomHeight}px)` : null,
                    paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                    paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                    paddingBottom: spacing / 2,
                    paddingTop: 0,
                }}
            >
                <CallToAction
                    {...callToAction}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    openWebView={openWebView}
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
                    [styles.showVideo]: isPreview || isStatic || isCapture,
                },
            ])}
            data-screen-ready={((isStatic || isCapture) && posterReady) || ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <div
                    ref={canvasContainerRef}
                    className={styles.videoContainer}
                    style={{
                        width: resizedImageWidth,
                        height: resizedImageHeight,
                        left: resizedImageLeft,
                        top: resizedImageTop,
                    }}
                />
                <div className={styles.inner}>{items}</div>
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
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

Image360Screen.propTypes = propTypes;
Image360Screen.defaultProps = defaultProps;

export default React.memo(Image360Screen);
