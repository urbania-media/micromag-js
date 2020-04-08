/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import MapComponent from '@micromag/component-map';
import TextComponent from '@micromag/component-text';
import ImageComponent from '@micromag/component-image';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    map: MicromagPropTypes.map,
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    map: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const MapScreen = ({ map, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const [index, setIndex] = useState();
    const { markers: mapMarkers = [] } = map || {};
    const markers = mapMarkers.map(m => ({ ...m, active: true }));
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const onClickMap = useCallback(() => {
        setIndex(null);
    }, []);

    const onClickMarker = useCallback(
        i => {
            setIndex(i);
        },
        [setIndex],
    );

    const center = markers.find((m, i) => i === index) || null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    {isSimple ? (
                        <Placeholders.Map />
                    ) : (
                        <>
                            <MapComponent
                                {...map}
                                {...(center
                                    ? { center: { lat: center.lat, lng: center.lng } }
                                    : null)}
                                markers={markers}
                                onClickMap={onClickMap}
                                onClickMarker={onClickMarker}
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
                                        <TextComponent
                                            className={styles.text}
                                            {...(marker.text ? marker.text : null)}
                                        />
                                        <ImageComponent
                                            className={styles.image}
                                            {...(marker.image ? marker.image : null)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </Frame>
            </Background>
        </div>
    );
};

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default MapScreen;
