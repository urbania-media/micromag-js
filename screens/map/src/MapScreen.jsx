/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import MapComponent from '@micromag/element-map';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import PreviewBackground from './preview.jpg';

import styles from './styles.module.scss';

const propTypes = {
    map: MicromagPropTypes.map,
    background: MicromagPropTypes.backgroundElement,
    cardBackground: MicromagPropTypes.backgroundElement,
    align: PropTypes.string,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    map: null,
    background: null,
    cardBackground: null,
    align: 'bottom',
    visible: true,
    active: true,
    renderFormat: 'view',
    className: null,
};

const MapScreen = ({
    map,
    background,
    cardBackground,
    align,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const [index, setIndex] = useState();

    const { markers: mapMarkers = [] } = map || {};
    const markers = mapMarkers.map(m => ({ ...m, active: true }));
    const center = markers.find((m, i) => i === index) || null;

    const onClickMap = useCallback(() => {
        setIndex(null);
    }, []);

    const onClickMarker = useCallback(
        (e, i) => {
            setIndex(i);
        },
        [setIndex],
    );

    const preview = isPlaceholder ? (
        <Placeholders.Map />
    ) : (
        <ImageComponent image={{ url: PreviewBackground, width, height }} />
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[align]]: align !== null,
                    [styles.disabled]: isSimple,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible}>
                    {isSimple ? (
                        preview
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
                                        <Background
                                            className={styles.background}
                                            {...cardBackground}
                                        >
                                            <TextComponent
                                                className={styles.text}
                                                {...(marker.text ? marker.text : null)}
                                            />
                                            <ImageComponent
                                                className={styles.image}
                                                {...(marker.image ? marker.image : null)}
                                            />
                                        </Background>
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

export default React.memo(MapScreen);
