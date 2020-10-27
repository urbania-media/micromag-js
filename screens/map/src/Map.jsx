/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Empty, Transitions, Button } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import MapElement from '@micromag/element-map';
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
};

const defaultProps = {
    layout: 'normal',
    map: null,
    markers: [],
    splash: null,
    openedMarkerSpacerHeight: 0.75,
    withMarkerImages: false,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    className: null,
};

const Map = ({
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
}) => {
    const [opened, setOpened] = useState(false);
    
    const [selectedMarker, setSelectedMarker] = useState(null);
    const hasSelectedMarker = selectedMarker !== null;
    const lastRenderedMarker = useRef(selectedMarker);

    const { width, height } = useScreenSize();
    const screenRatio = width / height;
    const maxWidth = maxRatio !== null && screenRatio > maxRatio ? height * maxRatio : width;

    const { isView, isPlaceholder, isPreview, isEdit } = useScreenRenderContext();

    const hasMap = map !== null;
    const isEmpty = isEdit && !hasMap;

    const [ready, setReady] = useState(!hasMap);
    const transitionPlaying = current && ready;

    const onMapReady = useCallback(() => setReady(true), [setReady]);

    const onClickMap = useCallback(() => setSelectedMarker(null), []);

    const onClickMarker = useCallback((e, i) => {
        lastRenderedMarker.current = markers[i];
        setSelectedMarker(i);
    }, [
        markers,
        setSelectedMarker,
    ]);

    const onSplashClick = useCallback(() => setOpened(true), [setOpened]);
    const onCloseClick = useCallback(() => setOpened(false), [setOpened]);

    let element = null;

    if (isEmpty) {
        element = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Map" description="Map placeholder" />
            </Empty>
        );
    } else if (isPlaceholder) {
        element = <PlaceholderMap className={styles.placeholder} />;
    } else if (isPreview) {
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
            staticUrl += `&markers=${markers.map(marker => {
                const { lat = null, lng = null } = marker.geoPosition || {};
                return lat !== null && lng !== null ? `${lat},${lng}` : '';
            }).join('|')}`;
        }
        element = <Image {...{ media: { url: staticUrl, width: maxWidth, height } }} width={maxWidth} height={height} />;
    } else if (hasMap) {
        const { title = null, description = null, image = null } = lastRenderedMarker.current || {};
        const hasTitle = title !== null;
        const hasDescription = description !== null;
        const hasImage = image !== null;

        element = (
            <Transitions transitions={transitions} playing={transitionPlaying} fullscreen>
                <MapElement
                    {...map}
                    markers={markers.map((marker, markerI) => ({...marker, active: markerI === selectedMarker}))}
                    onClickMarker={onClickMarker}
                    onReady={onMapReady}
                />
                <div className={styles.markerOverlay}>
                    <div className={styles.markerOverlayScrollable}>
                        <Button className={styles.markerOverlaySpacer} onClick={onClickMap} withoutStyle style={{height: height * openedMarkerSpacerHeight }} />
                        <div className={styles.markerOverlayContent} style={{minHeight: height * (1 - openedMarkerSpacerHeight) }}>
                            <div className={styles.swipeIndicator} />
                            <div className={styles.markerOverlayContentInner} key={`markerContent-${selectedMarker}`}>
                                { withMarkerImages && hasImage ? <Image className={styles.image} {...image} width="100%" /> : null }
                                { hasTitle ? <Heading className={styles.title} {...title} /> : null }
                                { hasDescription ? <Text className={styles.description} {...description} /> : null }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.splash}>
                    <Text className={styles.splashText} {...splash} />
                    <Button className={styles.splashButton} onClick={onSplashClick} withoutStyle />
                </div>
                <Button className={styles.closeButton} onClick={onCloseClick}>
                    X
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

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default React.memo(Map);
