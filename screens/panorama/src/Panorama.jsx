/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';

import { PropTypes as MicromagPropTypes, PlaceholderPanorama } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

export const layouts = ['center'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    panorama: PropTypes.object, // eslint-disable-line
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    panorama: {
        width: null,
        height: null,
        image: null,
    },
    background: null,
    current: true,
    active: true,
    renderFormat: 'view',
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

const PanoramaScreen = ({
    layout,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isPreview, isEditor } = getRenderFormat(renderFormat);

    const [ready, setReady] = useState(true);// @TODO
    const transitionPlaying = current && ready;

    let element = null;

    if (isPlaceholder) {
        element = <PlaceholderPanorama className={styles.placeholder} />;
    } else {
        element = (
            <Transitions transitions={transitions} playing={transitionPlaying}>
                { 'Panorama' }
            </Transitions>
        );
    }

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.placeholder]: isPlaceholder,
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
                    { element }
                </div>
            </Container>            
        </div>
    );
};

PanoramaScreen.propTypes = propTypes;
PanoramaScreen.defaultProps = defaultProps;

export default React.memo(PanoramaScreen);
