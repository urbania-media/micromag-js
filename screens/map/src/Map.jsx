/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { PlaceholderMap, Empty, Transitions } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import MapComponent from '@micromag/element-map';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';

import PreviewBackground from './preview.jpg';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'bottom']),
    map: MicromagPropTypes.map,
    markers: MicromagPropTypes.markers,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    map: null,
    markers: [],
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    className: null,
};

const Map = ({
    layout,
    map,
    markers: mapMarkers,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const [index, setIndex] = useState(0);
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isPreview, isEdit } = useScreenRenderContext();
    const withMap = map !== null;
    const isEmpty = isEdit && !withMap;

    const { map: { center: mapCenter = null } = {} } = map || {};

    const markers = mapMarkers.map((m) => ({ ...m, active: true }));
    const center = mapCenter || markers.find((m, i) => i === index) || {};

    const [ready, setReady] = useState(!withMap);
    const transitionPlaying = current && ready;

    const onMapReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const onClickMap = useCallback(() => {
        setIndex(null);
    }, []);

    const onClickMarker = useCallback(
        (e, i) => {
            setIndex(i);
        },
        [setIndex],
    );

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
        element = <ImageComponent {...{ media: { url: PreviewBackground, width, height } }} />;
    } else if (withMap) {
        element = (
            <Transitions transitions={transitions} playing={transitionPlaying} fullScreen>
                <MapComponent
                    {...map}
                    {...(center && center.lat && center.lng ? { center } : null)}
                    markers={markers}
                    onClickMap={onClickMap}
                    onClickMarker={onClickMarker}
                    onReady={onMapReady}
                />
                <div className={styles.cards}>
                    {markers.map((marker, i) => (
                        <div
                            key={`marker-${i + 1}`}
                            className={classNames([
                                styles.card,
                                {
                                    [styles.active]: i === index,
                                },
                            ])}
                        >
                            <div className={styles.background}>
                                <TextComponent
                                    className={styles.text}
                                    body={marker.text ? marker.text : null}
                                />
                                <ImageComponent
                                    className={styles.image}
                                    image={marker.image ? marker.image : null}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Transitions>
        );
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles[layout]]: layout !== null,
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
                <div className={styles.content}>{element}</div>
            </Container>
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default React.memo(Map);
