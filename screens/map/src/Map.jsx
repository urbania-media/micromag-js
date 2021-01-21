/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes, useResizeObserver } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Transitions, Button, ScreenElement } from '@micromag/core/components';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Map from '@micromag/element-map';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Image from '@micromag/element-image';

import styles from './styles.module.scss';

const gmapsApiKey = process.env.GOOGLE_MAPS_API_KEY || null;

const defaultCenter = {
    lat: 45.5,
    lng: -73.56,
};
const defaultZoom = 10;

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    scrollable: PropTypes.bool,
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
    onEnableInteraction: PropTypes.func,
    onDisableInteraction: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
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
    onEnableInteraction: null,
    onDisableInteraction: null,
    type: null,
    className: null,
};

const MapScreen = ({
    layout,
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
    onEnableInteraction,
    onDisableInteraction,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent();
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

    const finalMarkers = useMemo(
        () =>
            markers.map((marker, markerI) => ({
                ...marker,
                active: markerI === selectedMarker,
            })),
        [markers, active, selectedMarker],
    );

    const onClickMap = useCallback(() => {
        const lastMarker = finalMarkers[selectedMarker];
        lastRenderedMarker.current = lastMarker;
        setSelectedMarker(null);
        if (trackingEnabled) {
            trackScreenEvent(`screen-${type}`, 'click-marker-close', lastMarker.title.body, {
                marker: lastMarker,
            });
        }
    }, [finalMarkers, selectedMarker, trackScreenEvent, type, trackingEnabled]);

    const onClickMarker = useCallback(
        (e, i) => {
            const marker = finalMarkers[i];
            setSelectedMarker(i);
            if (trackingEnabled) {
                trackScreenEvent(`screen-${type}`, 'click-marker-open', marker.title.body, { marker });
            }
        },
        [finalMarkers, setSelectedMarker, trackScreenEvent, type, trackingEnabled],
    );

    const onSplashClick = useCallback(() => {
        setOpened(true);
        if (trackingEnabled) {
            trackScreenEvent(`screen-${type}`, 'click-button', button.body);
        }
        if (onDisableInteraction !== null) {
            onDisableInteraction();
        }
    }, [setOpened, onDisableInteraction, trackScreenEvent, type, trackingEnabled, button]);

    const onCloseClick = useCallback(() => {
        setOpened(false);
        if (trackingEnabled) {
            trackScreenEvent(`screen-${type}`, 'click-close', 'close-icon');
        }
        if (onEnableInteraction !== null) {
            onEnableInteraction();
        }
    }, [setOpened, onEnableInteraction, trackScreenEvent, type, trackingEnabled]);

    const onMapDragEnd = useCallback(() => {
        if (trackingEnabled) {
            trackScreenEvent(`screen-${type}`, 'drag-map', 'google-maps');
        }
    }, [trackScreenEvent, type]);

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
            if (defaultCenter !== null && (markers === null || markers.length === 0)) {
                const { lat = null, lng = null } = defaultCenter || {};
                staticUrl += `&center=${lat},${lng}`;
            }
            if (defaultZoom !== null) {
                staticUrl += `&zoom=${defaultZoom}`;
            }
            if (gmapsApiKey !== null) {
                staticUrl += `&key=${gmapsApiKey}`;
            }
            if (markers !== null) {
                staticUrl += markers
                    .map((marker) => {
                        const { geoPosition = null } = marker || {};
                        const { lat = null, lng = null } = geoPosition || {};
                        const { image = null } = marker || {};
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
        const renderedMarker = hasSelectedMarker
            ? finalMarkers[selectedMarker]
            : lastRenderedMarker.current;
        const {
            title: markerTitle = null,
            subtitle: markerSubtitle = null,
            description: markerDescription = null,
            image: markerImage = null,
        } = renderedMarker || {};

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
                    center={defaultCenter}
                    zoom={defaultZoom}
                    scrollable={scrollable}
                    markers={finalMarkers}
                    fitBounds
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
                <div className={classNames([styles.splash])}>
                    <ScreenElement
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Title"
                                description="Title placeholder"
                            />
                        }
                        emptyClassName={styles.emptyTitle}
                        isEmpty={!hasTitle}
                    >
                        <Heading className={styles.title} {...title} />
                    </ScreenElement>

                    <ScreenElement
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Description"
                                description="Description placeholder"
                            />
                        }
                        emptyClassName={styles.emptyDescription}
                        isEmpty={!hasDescription}
                    >
                        <Text className={styles.description} {...description} />
                    </ScreenElement>
                    <ScreenElement
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Button"
                                description="Button placeholder"
                            />
                        }
                        emptyClassName={styles.emptyButton}
                        isEmpty={!hasButton}
                    >
                        <Button
                            className={styles.splashButton}
                            onClick={onSplashClick}
                            withoutStyle
                        >
                            <Text className={styles.button} {...button} />
                        </Button>
                    </ScreenElement>
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

export default MapScreen;
