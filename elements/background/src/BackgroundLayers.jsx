/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getLayersFromBackground } from '@micromag/core/utils';

import Background from './Background';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    background: PropTypes.oneOf([
        MicromagPropTypes.backgroundElement,
        PropTypes.arrayOf(MicromagPropTypes.backgroundElement),
    ]),
    playing: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    background: [],
    playing: false,
    children: null,
    className: null,
};

const BackgroundLayers = ({ width, height, background, playing, children, className }) => {
    const hasSize = width > 0 && height > 0;

    const layers = useMemo(() => getLayersFromBackground(background), [background]);
    const maxZIndex = layers.length;

    // color
    const containerStyle = {
        ...(hasSize
            ? {
                  width,
                  height,
              }
            : null),
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerStyle}
        >
            <div className={styles.layers}>
                {layers.map(({ horizontalAlign = undefined, verticalAlign = undefined, ...layer }, index) => (
                    <div
                        className={classNames([
                            styles.layer,
                            {
                                [styles.bottom]: verticalAlign === 'bottom',
                                [styles.right]: horizontalAlign === 'right',
                            },
                        ])}
                        style={{
                            zIndex: maxZIndex - index,
                        }}
                    >
                        <Background
                            width={width}
                            height={height}
                            className={styles.background}
                            playing={playing}
                            horizontalAlign={horizontalAlign}
                            verticalAlign={verticalAlign}
                            {...layer}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

BackgroundLayers.propTypes = propTypes;
BackgroundLayers.defaultProps = defaultProps;

export default BackgroundLayers;
