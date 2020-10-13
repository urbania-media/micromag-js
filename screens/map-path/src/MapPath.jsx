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
import ButtonComponent from '@micromag/element-button';

import { PropTypes as MicromagPropTypes, PlaceholderMapPath, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import PreviewBackground from './preview.jpg';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = ['top', 'bottom'];

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

const MapPath = ({
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
    const { isView, isPlaceholder, isEditor, isPreview } = getRenderFormat(renderFormat);
    const isSimple = isPlaceholder || isPreview;
    const isEmpty = isEditor && map === null;

    const { map: { center: mapCenter = null } = {} } = map || {};

    const markers = mapMarkers || []; // .map((m, i) => ({ ...m })) : [];
    const center = mapCenter || markers.find((m, i) => i === index) || null;

    const onClickMarker = useCallback(
        (i) => {
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

    const preview = isPlaceholder ? <PlaceholderMapPath className={styles.placeholder} /> : element;

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
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <div className={styles.inner}>
                        {isSimple || isEmpty ? (
                            preview
                        ) : (
                            <>
                                <MapComponent
                                    {...map}
                                    {...(center && center.lat && center.lng ? { center } : null)}
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
                    </div>
                </div>
            </Container>
        </div>
    );
};

MapPath.propTypes = propTypes;
MapPath.defaultProps = defaultProps;

export default React.memo(MapPath);
