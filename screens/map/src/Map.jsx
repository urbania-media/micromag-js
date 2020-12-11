/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes, useResizeObserver } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Empty, Transitions, Button } from '@micromag/core/components';
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
    map: MicromagPropTypes.map,
    markers: MicromagPropTypes.markers,
    splash: PropTypes.string,
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
    map: {
        zoom: 9,
        center: {
            lat: 45.5,
            lng: -73.56,
        },
    },
    markers: [],
    splash: null,
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
    map,
    markers,
    splash,
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

    const hasMap = map !== null;
    const isEmpty = isEdit && !hasMap;

    const [ready, setReady] = useState(!hasMap);
    const transitionPlaying = current && ready;

    const onMapReady = useCallback(() => setReady(true), [setReady]);

    const onClickMap = useCallback(() => setSelectedMarker(null), []);

    const onClickMarker = useCallback(
        (e, i) => {
            lastRenderedMarker.current = markers[i];
            setSelectedMarker(i);
        },
        [markers, setSelectedMarker],
    );

    const onSplashClick = useCallback(() => {
        setOpened(true);
        if (onDisableInteraction !== null) {
            onDisableInteraction();
        }
    }, [setOpened, onDisableInteraction]);

    const onCloseClick = useCallback(() => {
        setOpened(false);
        if (onEnableInteraction !== null) {
            onEnableInteraction();
        }
    }, [setOpened, onEnableInteraction]);

    const {
        ref: markerOverContentInnerRef,
        entry: { contentRect: markerOverContentInnerRect },
    } = useResizeObserver({ disabled: !isView && !hasMap });
    const { width: markerOverContentInnerWidth = '100%' } = markerOverContentInnerRect || {};

    let element = null;

    if (isEmpty) {
        element = (
            <Empty className={styles.empty}>
                {withMarkerImages ? (
                    <FormattedMessage
                        defaultMessage="MapImages"
                        description="MapImages placeholder"
                    />
                ) : (
                    <FormattedMessage
                        defaultMessage="MapScreen"
                        description="MapScreen placeholder"
                    />
                )}
            </Empty>
        );
    } else if (isPlaceholder) {
        element = <PlaceholderMap className={styles.placeholder} withImages={withMarkerImages} />;
    } else if (isPreview) {
        if (maxWidth > 0 && height > 0) {
            let staticUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${maxWidth}x${height}`;
            const { center = null, zoom = null } = map;
            if (center !== null) {
                const { lat = null, lng = null } = center;
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
                            ? `&markers=icon:${url}%7C${lat},${lng}`
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
    } else if (hasMap) {
        const { title = null, description = null, image = null } = lastRenderedMarker.current || {};
        const hasTitle = title !== null;
        const hasDescription = description !== null;
        const hasImage = image !== null;
        element = (
            <Transitions
                transitions={transitions}
                playing={transitionPlaying}
                fullscreen
                disabled={!isView}
            >
                <Map
                    {...map}
                    markers={markers.map((marker, markerI) => ({
                        ...marker,
                        active: markerI === selectedMarker,
                    }))}
                    onClickMarker={onClickMarker}
                    onReady={onMapReady}
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
                                    {hasImage ? (
                                        <Image
                                            className={styles.image}
                                            media={image}
                                            width={markerOverContentInnerWidth}
                                        />
                                    ) : null}
                                    {hasTitle ? (
                                        <Heading className={styles.title} {...title} />
                                    ) : null}
                                    {hasDescription ? (
                                        <Text className={styles.description} {...description} />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.splash}>
                    <Button className={styles.splashButton} onClick={onSplashClick} withoutStyle>
                        <Text className={styles.splashText} {...splash} inline />
                    </Button>
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
