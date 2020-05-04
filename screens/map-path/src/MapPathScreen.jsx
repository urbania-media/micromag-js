/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import MapComponent from '@micromag/element-map';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import ButtonComponent from '@micromag/element-button';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import PreviewBackground from './preview.jpg';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    map: MicromagPropTypes.map,
    background: MicromagPropTypes.backgroundElement,
    align: PropTypes.string,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    map: null,
    background: null,
    align: 'bottom',
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const MapPathScreen = ({ map, background, align, visible, active, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const { markers: mapMarkers = [] } = map || {};
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && map === null;

    const [index, setIndex] = useState(0);
    const markers = mapMarkers || []; // .map((m, i) => ({ ...m })) : [];
    const currentMarker = markers.find((m, i) => i === index) || null;

    const onClickMarker = useCallback(
        i => {
            setIndex(i);
        },
        [setIndex],
    );

    const onClickNext = useCallback(() => {
        if (index < markers.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }, [markers, index, setIndex]);

    const onClickPrevious = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(markers.length - 1);
        }
    }, [markers, index, setIndex]);

    const element = isEmpty ? (
        <Empty className={styles.empty}>
            <FormattedMessage {...messages.schemaTitle} />
        </Empty>
    ) : (
        <ImageComponent
            {...{
                image: { url: PreviewBackground },
                maxWidth: width,
                maxHeight: height,
            }}
        />
    );

    const preview = isPlaceholder ? <Placeholders.MapPath /> : element;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[align]]: align !== null,
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
                    {isSimple || isEmpty ? (
                        preview
                    ) : (
                        <>
                            <MapComponent
                                {...map}
                                {...(currentMarker
                                    ? { center: { lat: currentMarker.lat, lng: currentMarker.lng } }
                                    : null)}
                                markers={markers}
                                withLine
                                onClickMap={null}
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
                                        <TextComponent {...(marker.text ? marker.text : null)} />
                                        <ImageComponent {...(marker.image ? marker.image : null)} />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.controls}>
                                <ButtonComponent
                                    className={styles.previous}
                                    onClick={onClickPrevious}
                                >
                                    Previous
                                </ButtonComponent>
                                <ButtonComponent className={styles.next} onClick={onClickNext}>
                                    Next
                                </ButtonComponent>
                            </div>
                        </>
                    )}
                </Frame>
            </Background>
        </div>
    );
};

MapPathScreen.propTypes = propTypes;
MapPathScreen.defaultProps = defaultProps;

export default React.memo(MapPathScreen);
