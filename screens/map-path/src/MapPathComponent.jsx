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

const MapPath = ({ map, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const [active, setActive] = useState();
    const { markers } = map || {};
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const onClickMarker = useCallback(
        i => {
            setActive(i);
        },
        [setActive],
    );

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
                        <MapComponent {...map} onClickMarker={onClickMarker} />
                    )}
                    <div className={styles.cards}>
                        {markers
                            ? markers.map((marker, i) => (
                                <div
                                    key={`marker-${i + 1}`}
                                    className={classNames([
                                          styles.card,
                                          {
                                              [styles.active]: i === active,
                                          },
                                      ])}
                                  >
                                    <TextComponent {...(marker.text ? marker.text : null)} />
                                    <ImageComponent {...(marker.image ? marker.image : null)} />
                                </div>
                              ))
                            : null}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

MapPath.propTypes = propTypes;
MapPath.defaultProps = defaultProps;

export default MapPath;
