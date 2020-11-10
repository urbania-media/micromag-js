/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import {
    PlaceholderAudio,
    Transitions,
} from '@micromag/core/components';
import AudioElement from '@micromag/element-audio';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    maxWidth: PropTypes.number,
    audio: MicromagPropTypes.audioElement,
    closedCaptions: MicromagPropTypes.closedCaptionsElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    maxWidth: 300,
    audio: null,
    closedCaptions: null,
    background: null,
    current: true,
    active: true,
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

const Audio = ({
    layout,
    audio,
    closedCaptions,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const apiRef = useRef();
    
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEdit } = useScreenRenderContext();

    const [ready, setReady] = useState(false);
    const transitionPlaying = current && ready;

    const onAudioReady = useCallback( () => {
        setReady(true);
    }, [setReady]);

    let element = null;
    if (isPlaceholder) {
        element = <PlaceholderAudio className={styles.placeholder} />;
    } else {
        element = (
            <Transitions transitions={transitions} playing={transitionPlaying}>
                <AudioElement
                    className={styles.audio}
                    {...audio}
                    closedCaptions={closedCaptions}
                    ref={apiRef}
                    onReady={onAudioReady}
                />
            </Transitions>
        );
    }

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
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    {element}
                </div>
            </Container>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.memo(Audio);
