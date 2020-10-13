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

import { PropTypes as MicromagPropTypes, PlaceholderMap, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import PreviewBackground from './preview.jpg';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = [
    'top',
    'bottom'
];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    map: MicromagPropTypes.map,
    markers: MicromagPropTypes.markers,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
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
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
};

const Map = ({
    layout,
    map,
    markers: mapMarkers,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
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

    const preview = isPlaceholder ? <PlaceholderMap className={styles.placeholder} /> : element;
    const isPreview = isSimple || isEmpty || (!center.lat && !center.lng);

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.placeholder]: isPlaceholder,
                [styles[layout]]: layout !== null,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <div className={styles.inner}>
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
                    </div>
                </div>
            </Container>            
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default React.memo(Map);