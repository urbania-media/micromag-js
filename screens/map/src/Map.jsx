/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Transitions, Button, ScreenElement } from '@micromag/core/components';
import { useTrackScreenEvent, useResizeObserver } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Map from '@micromag/element-map';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
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
    transitions,
    onEnableInteraction,
    onDisableInteraction,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
    const [opened, setOpened] = useState(false);

    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
    const hasSelectedMarker = selectedMarkerIndex !== null;
    const lastRenderedMarker = useRef(null);

    const { width, height } = useScreenSize();

    const { isView, isPlaceholder, isPreview, isEdit } = useScreenRenderContext();

    const [ready, setReady] = useState(false);
    const transitionPlaying = current && ready;
    const transitionDisabled = !isView && !isEdit;
    const backgroundPlaying = current && (isView || isEdit);

    const onMapReady = useCallback(() => setReady(true), [setReady]);

    const finalMarkers = useMemo(
        () =>
            markers.map((marker, markerI) => ({
                ...marker,
                active: markerI === selectedMarkerIndex,
            })),
        [markers, selectedMarkerIndex],
    );

    const onClickMap = useCallback(() => {
        const lastMarker = finalMarkers[selectedMarkerIndex];
        lastRenderedMarker.current = lastMarker;
        setSelectedMarkerIndex(null);
        trackScreenEvent(
            'click_marker_close',
            `Marker ${selectedMarkerIndex + 1}: ${lastMarker.title.body}`,
            {
                marker: lastMarker,
                markerIndex: selectedMarkerIndex,
            },
        );
    }, [finalMarkers, selectedMarkerIndex, trackScreenEvent]);

    const onClickMarker = useCallback(
        (e, index) => {
            const marker = finalMarkers[index];
            setSelectedMarkerIndex(index);
            trackScreenEvent('click_marker_open', `Marker ${index + 1}: ${marker.title.body}`, {
                marker,
                markerIndex: index,
            });
        },
        [finalMarkers, setSelectedMarkerIndex, trackScreenEvent],
    );

    const onButtonClick = useCallback(() => {
        setOpened(true);
        if (onDisableInteraction !== null) {
            onDisableInteraction();
        }
        trackScreenEvent('click_button', button.body);
    }, [setOpened, onDisableInteraction, trackScreenEvent, button]);

    const onCloseClick = useCallback(() => {
        setOpened(false);
        if (onEnableInteraction !== null) {
            onEnableInteraction();
        }
        trackScreenEvent('click_close', 'Close icon');
    }, [setOpened, onEnableInteraction, trackScreenEvent]);

    const onMapDragEnd = useCallback(
        (center) => {
            const coords = center.toJSON();
            trackScreenEvent(
                'drag_map',
                `Latitude: ${coords.lat.toFixed(4)}, Longitude: ${coords.lng.toFixed(4)}`,
                { coords },
            );
        },
        [trackScreenEvent],
    );

    const onScrolledBottom = useCallback(() => {
        const selectedMarker = markers[selectedMarkerIndex];
        trackScreenEvent(
            'scroll',
            `Marker ${selectedMarkerIndex + 1}: ${selectedMarker.title.body}`,
            { marker: selectedMarker, markerIndex: selectedMarkerIndex },
        );
    }, [trackScreenEvent, markers, selectedMarkerIndex]);

    const {
        ref: markerOverContentInnerRef,
        entry: { contentRect: markerOverContentInnerRect },
    } = useResizeObserver({ disabled: !isView });
    const { width: markerOverContentInnerWidth = '100%' } = markerOverContentInnerRect || {};

    let element = null;
    if (isPlaceholder) {
        element = <PlaceholderMap className={styles.placeholder} withImages={withMarkerImages} />;
    } else if (isPreview) {
        if (width > 0 && height > 0) {
            let staticUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}`;
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
                                width: Math.min(640, width),
                                height: Math.min(640, height),
                            },
                        },
                    }}
                    width={width}
                    height={height}
                    objectFit={{ fit: 'cover' }}
                />
            );
        }
    } else {
        const renderedMarker = hasSelectedMarker
            ? finalMarkers[selectedMarkerIndex]
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
                        <Scroll
                            key={`scroll-${selectedMarkerIndex}`}
                            fullscreen
                            disabled={!current}
                            onScrolledBottom={onScrolledBottom}
                        >
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
                                        key={`markerContent-${selectedMarkerIndex}`}
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
                                            <Heading
                                                className={styles.markerTitle}
                                                {...markerTitle}
                                            />
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
                        </Scroll>
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
                            onClick={onButtonClick}
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
                playing={backgroundPlaying}
            />
            <Container width={width} height={height}>
                {element}
            </Container>
        </div>
    );
};

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default MapScreen;
