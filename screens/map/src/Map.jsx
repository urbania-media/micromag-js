/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
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

import PreviewBackground from './preview.jpg';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['bottom', 'top']),
    map: MicromagPropTypes.map,
    markers: MicromagPropTypes.markers,
    splash: PropTypes.string,
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
    splash: null,
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

    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isPreview, isEdit } = useScreenRenderContext();

    const hasMap = map !== null;
    const isEmpty = isEdit && !hasMap;

    const [ready, setReady] = useState(!hasMap);
    const transitionPlaying = current && ready;

    const onMapReady = useCallback(() => setReady(true), [setReady]);

    const onClickMap = useCallback(() => setSelectedMarker(null), []);

    const onClickMarker = useCallback((e, i) => setSelectedMarker(markers[i]), [
        markers,
        setSelectedMarker,
    ]);

    const onSplashClick = useCallback(() => setOpened(true), [setOpened]);

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
        element = <Image {...{ media: { url: PreviewBackground, width, height } }} />;
    } else if (hasMap) {
        const { title = null, description = null, image = null } = selectedMarker || {};
        element = (
            <Transitions transitions={transitions} playing={transitionPlaying} fullscreen>
                <MapElement
                    {...map}
                    markers={markers}
                    onClickMap={onClickMap}
                    onClickMarker={onClickMarker}
                    onReady={onMapReady}
                />
                <div className={styles.markerContent}>
                    <Button className={styles.markerContentSafe} onClick={onSplashClick} withoutStyle />
                    <div className={styles.markerContentInner}>
                        <div className={styles.swipeIndicator} />
                        <div className={styles.marker}>
                            <Image className={styles.image} {...image} />
                            <Heading className={styles.title} {...title} />
                            <Text className={styles.description} {...description} />
                        </div>
                    </div>
                </div>
                <div className={styles.splash}>
                    <Text className={styles.splashText} {...splash} />
                    <Button className={styles.splashButton} onClick={onSplashClick} withoutStyle />
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
