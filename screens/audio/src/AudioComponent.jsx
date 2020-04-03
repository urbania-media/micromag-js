/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from '@micromag/component-text';
import ImageComponent from '@micromag/component-image';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Box from '@micromag/component-box';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    audio: MicromagPropTypes.audioComponent,
    text: MicromagPropTypes.text,
    image: MicromagPropTypes.image,
    box: MicromagPropTypes.box,
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    audio: {
        src: null,
        track: null,
        trackLng: null,
        controls: true,
    },
    image: null,
    text: null,
    box: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const Audio = ({ audio, image, text, box, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';
    const { src, track, trackLng, controls } = audio;
    const audioProps = {
        src,
        controls,
    };
    const items = [];

    if (isSimple && image !== null) {
        items.push(<Placeholders.Image className={styles.placeholder} />);
    } else if (!isSimple) {
        items.push(
            <ImageComponent
                {...image}
                maxWidth={Math.min(width, 300)}
                maxHeight={Math.min(width, 300)}
                fit={{ size: 'cover' }}
                className={styles.image}
            />,
        );
    }

    if (isSimple && text !== null) {
        items.push(<Placeholders.Text className={styles.placeholder} />);
    } else if (!isSimple) {
        items.push(<TextComponent {...text} className={styles.text} />);
    }

    if (isSimple) {
        items.push(<Placeholders.Audio className={styles.placeholder} />);
    } else if (!isSimple) {
        items.push(
            <audio className={styles.audio} {...audioProps}>
                {track !== null ? (
                    <track default kind="captions" srcLang={trackLng} src={track} />
                ) : null}
            </audio>,
        );
    }

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
                    <Box
                        {...box}
                        items={items}
                        className={styles.box}
                        itemClassName={isSimple ? styles.placeholderItem : null}
                    />
                </Frame>
            </Background>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default Audio;
