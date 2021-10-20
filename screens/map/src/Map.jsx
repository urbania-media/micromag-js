/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useGoogleKeys, useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Transitions, ScreenElement, Button } from '@micromag/core/components';
import { useTrackScreenEvent, useResizeObserver } from '@micromag/core/hooks';
import { getStyleFromColor, isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Map from '@micromag/element-map';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import ButtonElement from '@micromag/element-button';

import styles from './styles.module.scss';

const defaultCenter = {
    lat: 45.5,
    lng: -73.56,
};
const defaultZoom = 10;

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    draggable: PropTypes.bool,
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
    draggable: true,
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
    draggable,
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
    const { locale } = useIntl();
    const { apiKey = null } = useGoogleKeys();

    const trackScreenEvent = useTrackScreenEvent(type);

    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
    const hasSelectedMarker = selectedMarkerIndex !== null;
    const lastRenderedMarker = useRef(null);

    const { width, height } = useScreenSize();

    const { color: backgroundColor } = background || {};
    const markerOverlayContentStyle = getStyleFromColor(backgroundColor);

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

    const [ready, setReady] = useState(false);
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;
    const backgroundPlaying = current && (isView || isEdit);
    const [opened, setOpened] = useState(isStatic || isCapture);

    const onMapReady = useCallback(() => setReady(true), [setReady]);

    const finalMarkers = useMemo(
        () =>
            (markers || []).map((marker, markerI) => ({
                ...marker,
                active: markerI === selectedMarkerIndex,
            })),
        [markers, selectedMarkerIndex],
    );

    const closeMarker = useCallback(() => {
        const lastMarker = finalMarkers[selectedMarkerIndex];
        lastRenderedMarker.current = lastMarker;
        setSelectedMarkerIndex(null);
    }, [finalMarkers, selectedMarkerIndex, setSelectedMarkerIndex]);

    const onClickMap = useCallback(() => {
        const lastMarker = finalMarkers[selectedMarkerIndex];
        trackScreenEvent(
            'click_marker_close',
            `Marker ${selectedMarkerIndex + 1}: ${lastMarker.title.body}`,
            {
                marker: lastMarker,
                markerIndex: selectedMarkerIndex,
            },
        );
        closeMarker();
    }, [finalMarkers, selectedMarkerIndex, trackScreenEvent, closeMarker]);

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
        closeMarker();
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

    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                const selectedMarker = (markers || [])[selectedMarkerIndex];
                trackScreenEvent(
                    'scroll',
                    `Marker ${selectedMarkerIndex + 1}: ${selectedMarker.title.body}`,
                    { marker: selectedMarker, markerIndex: selectedMarkerIndex },
                );
            }
        },
        [trackScreenEvent, markers, selectedMarkerIndex],
    );

    const {
        ref: markerOverContentInnerRef,
        entry: { contentRect: markerOverContentInnerRect },
    } = useResizeObserver({ disabled: !isView });
    const { width: markerOverContentInnerWidth = '100%' } = markerOverContentInnerRect || {};

    const [markerImagesLoaded, setMarkerImagesLoaded] = useState(0);
    const allMarkersImagesLoaded = markerImagesLoaded === (markers || []).length;

    const finalReady = ready && (!withMarkerImages || allMarkersImagesLoaded);

    useEffect(() => {
        if (withMarkerImages && markers !== null && (markers || []).length) {
            setMarkerImagesLoaded(0);
            const imgs = markers.map((marker) => {
                const { image = null } = marker || {};
                const { url = null } = image || {};
                const withUrl = url !== null;
                if (withUrl) {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                        setMarkerImagesLoaded((index) => setMarkerImagesLoaded(index + 1));
                    };
                    return img;
                }
                return null;
            });

            return () => {
                imgs.filter((img) => img !== null).forEach((img) => {
                    img.onload = () => {}; // eslint-disable-line no-param-reassign
                });
            };
        }
        return () => {};
    }, [withMarkerImages, markers]);

    let element = null;
    if (isPlaceholder) {
        element = <PlaceholderMap className={styles.placeholder} withImages={withMarkerImages} />;
    } else if (isPreview) {
        if (width > 0 && height > 0 && apiKey !== null) {
            let staticUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${Math.round(
                width,
            )}x${Math.round(height)}`;
            if (defaultCenter !== null && (markers === null || markers.length === 0)) {
                const { lat = null, lng = null } = defaultCenter || {};
                staticUrl += `&center=${lat},${lng}`;
            }
            if (defaultZoom !== null) {
                staticUrl += `&zoom=${defaultZoom}`;
            }
            if (apiKey !== null) {
                staticUrl += `&key=${apiKey}`;
            }
            if (locale !== null) {
                staticUrl += `&language=${locale}`;
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
                <ImageElement
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
                    key="map"
                    center={defaultCenter}
                    zoom={defaultZoom}
                    draggable={draggable}
                    markers={finalMarkers}
                    fitBounds
                    onClickMarker={onClickMarker}
                    onReady={onMapReady}
                    onDragEnd={onMapDragEnd}
                />
                <div key="marker-overlay" className={styles.markerOverlayContainer}>
                    <div className={styles.markerOverlayScrollable}>
                        <Scroll
                            fullscreen
                            disabled={scrollingDisabled}
                            onScrolledBottom={onScrolledBottom}
                        >
                            <Button
                                className={styles.markerOverlaySafe}
                                onClick={onClickMap}
                                withoutStyle
                                style={{ height: height * openedMarkerSpacerHeight }}
                                disabled={isPreview}
                                focusable={current && isView}
                            />
                            <div
                                className={styles.markerOverlay}
                                style={{ minHeight: height * (1 - openedMarkerSpacerHeight) }}
                            >
                                <div
                                    className={styles.markerOverlayContent}
                                    style={markerOverlayContentStyle}
                                >
                                    <div className={styles.swipeIndicator} />
                                    <div
                                        className={styles.markerOverlayContentInner}
                                        key={`markerContent-${selectedMarkerIndex}`}
                                        ref={markerOverContentInnerRef}
                                    >
                                        {hasMarkerImage ? (
                                            <ImageElement
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
                <div key="splash" className={classNames([styles.splash])}>
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
                        <ButtonElement
                            className={styles.splashButton}
                            onClick={onButtonClick}
                            buttonStyle={button !== null ? button.buttonStyle : null}
                            focusable={current && isView}
                        >
                            <Text className={styles.button} {...button} />
                        </ButtonElement>
                    </ScreenElement>
                </div>
                {!isStatic && !isCapture ? (
                    <Button
                        key="close-button"
                        className={styles.closeButton}
                        onClick={onCloseClick}
                        focusable={current && isView}
                    >
                        &times;
                    </Button>
                ) : null}
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
            data-screen-ready={finalReady}
        >
            {!isPlaceholder ? (
                <Background
                    color={{ color: '#FFFFFF', alpha: 1 }}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                />
            ) : null}
            <Container width={width} height={height}>
                {element}
            </Container>
        </div>
    );
};

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default MapScreen;
