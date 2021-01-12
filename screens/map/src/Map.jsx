/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes, useResizeObserver } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Transitions, Button } from '@micromag/core/components';
import { useTrackEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Map from '@micromag/element-map';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Image from '@micromag/element-image';

import styles from './styles.module.scss';

const gmapsApiKey = process.env.GOOGLE_MAPS_API_KEY || null;

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    scrollable: PropTypes.bool,
    center: MicromagPropTypes.geoPosition,
    zoom: PropTypes.number,
    markers: PropTypes.oneOfType([MicromagPropTypes.markers, MicromagPropTypes.markersWithImage]),
    title: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
    button: MicromagPropTypes.textElement,
    openedMarkerSpacerHeight: PropTypes.number,
    withMarkerImages: PropTypes.bool,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
    onEnableInteraction: PropTypes.func,
    onDisableInteraction: PropTypes.func,
};

const defaultProps = {
    layout: 'normal',
    center: null,
    zoom: null,
    scrollable: true,
    markers: [],
    title: null,
    description: null,
    button: null,
    openedMarkerSpacerHeight: 0.75,
    withMarkerImages: false,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
    onEnableInteraction: null,
    onDisableInteraction: null,
};

const MapScreen = ({
    layout,    
    center,
    zoom, 
    scrollable,
    markers,
    title,
    description,
    button,
    openedMarkerSpacerHeight,
    withMarkerImages,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
    onEnableInteraction,
    onDisableInteraction,
}) => {
    const trackEvent = useTrackEvent();
    const [opened, setOpened] = useState(false);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const hasSelectedMarker = selectedMarker !== null;
    const lastRenderedMarker = useRef(selectedMarker);

    const { width, height } = useScreenSize();
    const screenRatio = width / height;
    const maxWidth = Math.round(
        maxRatio !== null && screenRatio > maxRatio ? height * maxRatio : width,
    );

    const { isView, isPlaceholder, isPreview, isEdit } = useScreenRenderContext();

    const [ready, setReady] = useState(false);
    const transitionPlaying = current && ready;
    const transitionDisabled = !isView && !isEdit;

    const trackingEnabled = isView;

    const onMapReady = useCallback(() => setReady(true), [setReady]);

    const onClickMap = useCallback(() => {
        setSelectedMarker(null);
        if (trackingEnabled) {
            trackEvent('screen-interaction', 'map', {
                label: 'marker-unselect',
                marker: lastRenderedMarker.current,
            });
        }
    }, [trackEvent, trackingEnabled]);

    const onClickMarker = useCallback(
        (e, i) => {
            const marker = markers[i];
            lastRenderedMarker.current = marker;
            setSelectedMarker(i);
            if (trackingEnabled) {
                trackEvent('screen-interaction', 'map', { label: 'marker-select', marker });
            }
        },
        [markers, setSelectedMarker, trackEvent, trackingEnabled],
    );

    const onSplashClick = useCallback(() => {
        setOpened(true);
        if (trackingEnabled) {
            trackEvent('screen-interaction', 'map', { label: 'start' });
        }
        if (onDisableInteraction !== null) {
            onDisableInteraction();
        }
    }, [setOpened, onDisableInteraction, trackEvent, trackingEnabled]);

    const onCloseClick = useCallback(() => {
        setOpened(false);
        if (trackingEnabled) {
            trackEvent('screen-interaction', 'map', { label: 'stop' });
        }
        if (onEnableInteraction !== null) {
            onEnableInteraction();
        }
    }, [setOpened, onEnableInteraction, trackEvent, trackingEnabled]);

    const onMapDragEnd = useCallback(() => {
        if (trackingEnabled) {
            trackEvent('screen-interaction', 'map', { label: 'dragged' });
        }
    }, [trackEvent]);

    const {
        ref: markerOverContentInnerRef,
        entry: { contentRect: markerOverContentInnerRect },
    } = useResizeObserver({ disabled: !isView });
    const { width: markerOverContentInnerWidth = '100%' } = markerOverContentInnerRect || {};

    let element = null;
    if (isPlaceholder) {
        element = <PlaceholderMap className={styles.placeholder} withImages={withMarkerImages} />;
    } else if (isPreview) {
        if (maxWidth > 0 && height > 0) {
            let staticUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${maxWidth}x${height}`;
            if (center !== null) {
                const { lat = null, lng = null } = center || {};
                staticUrl += `&center=${lat},${lng}`;
            }
            if (zoom !== null) {
                staticUrl += `&zoom=${zoom}`;
            }
            if (gmapsApiKey !== null) {
                staticUrl += `&key=${gmapsApiKey}`;
            }
            if (markers !== null) {
                staticUrl += markers
                    .map((marker) => {
                        const { lat = null, lng = null } = marker.geoPosition || {};
                        const { image = null } = marker;
                        const { url = null } = image || {};
                        return lat !== null && lng !== null
                            ? `&markers=${url !== null ? `icon:${url}` : ''}%7C${lat},${lng}`
                            : '';
                    })
                    .join('');
            }
            element = (
                <Image
                    {...{
                        media: {
                            url: staticUrl,
                            metadata: {
                                width: Math.min(640, maxWidth),
                                height: Math.min(640, height),
                            },
                        },
                    }}
                    width={maxWidth}
                    height={height}
                    objectFit={{ fit: 'cover' }}
                />
            );
        }
    } else {
        const {
            title: markerTitle = null,
            subtitle: markerSubtitle = null,
            description: markerDescription = null,
            image: markerImage = null,
        } = lastRenderedMarker.current || {};
        const hasMarkerTitle = markerTitle !== null;
        const hasMarkerSubtitle = markerSubtitle !== null;
        const hasMarkerDescription = markerDescription !== null;
        const hasMarkerImage = markerImage !== null;

        const hasTitle = isTextFilled(title);
        const hasDescription = isTextFilled(description);
        const hasButton = isTextFilled(button);
        element = (
            <Transitions
                transitions={transitions}
                playing={transitionPlaying}
                fullscreen
                disabled={transitionDisabled}
            >
                <Map
                    center={center}
                    zoom={zoom}
                    scrollable={scrollable}
                    markers={markers.map((marker, markerI) => ({
                        ...marker,
                        active: markerI === selectedMarker,
                    }))}
                    onClickMarker={onClickMarker}
                    onReady={onMapReady}
                    onDragEnd={onMapDragEnd}
                />
                <div className={styles.markerOverlayContainer}>
                    <div className={styles.markerOverlayScrollable}>
                        <Button
                            className={styles.markerOverlaySafe}
                            onClick={onClickMap}
                            withoutStyle
                            style={{ height: height * openedMarkerSpacerHeight }}
                            disabled={isPreview}
                        />
                        <div
                            className={styles.markerOverlay}
                            style={{ minHeight: height * (1 - openedMarkerSpacerHeight) }}
                        >
                            <div className={styles.markerOverlayContent}>
                                <div className={styles.swipeIndicator} />
                                <div
                                    className={styles.markerOverlayContentInner}
                                    key={`markerContent-${selectedMarker}`}
                                    ref={markerOverContentInnerRef}
                                >
                                    {hasMarkerImage ? (
                                        <Image
                                            className={styles.markerImage}
                                            media={markerImage}
                                            width={markerOverContentInnerWidth}
                                        />
                                    ) : null}
                                    {hasMarkerTitle ? (
                                        <Heading className={styles.markerTitle} {...markerTitle} />
                                    ) : null}
                                    {hasMarkerSubtitle ? (
                                        <Heading
                                            size={3}
                                            className={styles.markerSubtitle}
                                            {...markerSubtitle}
                                        />
                                    ) : null}
                                    {hasMarkerDescription ? (
                                        <Text
                                            className={styles.markerDescription}
                                            {...markerDescription}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames([styles.splash, { [styles.splashEmpty]: !hasButton }])}>
                    {hasTitle ? <Heading className={styles.title} {...title} /> : null}
                    {hasDescription ? (
                        <Text className={styles.description} {...description} />
                    ) : null}
                    {hasButton ? (
                        <Button
                            className={styles.splashButton}
                            onClick={onSplashClick}
                            withoutStyle
                        >
                            <Text className={styles.splashText} {...button} inline />
                        </Button>
                    ) : null}
                </div>
                <Button className={styles.closeButton} onClick={onCloseClick}>
                    &times;
                </Button>
            </Transitions>
        );
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles[`${layout}Layout`]]: layout !== null,
                    [styles.opened]: opened,
                    [styles.hasSelectedMarker]: hasSelectedMarker,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                {element}
            </Container>
        </div>
    );
};

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default React.memo(MapScreen);
