/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import MapComponent from '@micromag/element-map';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import PreviewBackground from './preview.jpg';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    map: MicromagPropTypes.map,
    markers: MicromagPropTypes.markers,
    background: MicromagPropTypes.backgroundElement,
    align: PropTypes.string,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    map: null,
    markers: [],
    background: null,
    align: 'bottom',
    visible: true,
    active: true,
    renderFormat: 'view',
    className: null,
};

const MapScreen = ({
    map,
    markers: mapMarkers,
    background,
    align,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const [index, setIndex] = useState(0);
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && map === null;

    const { map: { center: mapCenter = null } = {} } = map || {};

    const markers = mapMarkers.map((m) => ({ ...m, active: true }));
    const center = mapCenter || markers.find((m, i) => i === index) || {};

    const onClickMap = useCallback(() => {
        setIndex(null);
    }, []);

    const onClickMarker = useCallback(
        (e, i) => {
            setIndex(i);
        },
        [setIndex],
    );

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

    const preview = isPlaceholder ? <Placeholders.Map className={styles.placeholder} /> : element;
    const isPreview = isSimple || isEmpty || (!center.lat && !center.lng);

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[align]]: align !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    {isPreview ? (
                        preview
                    ) : (
                        <>
                            <MapComponent
                                {...map}
                                {...(center && center.lat && center.lng ? { center } : null)}
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
                        </>
                    )}
                </Container>
            </div>
        </div>
    );
};

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default React.memo(MapScreen);
