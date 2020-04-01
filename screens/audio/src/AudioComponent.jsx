/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from '@micromag/component-text';
import ImageComponent from '@micromag/component-image';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    src: PropTypes.string,
    track: PropTypes.string,
    trackLng: PropTypes.string,
    controls: PropTypes.bool,
    text: MicromagPropTypes.text,
    image: MicromagPropTypes.image,
    background: MicromagPropTypes.backgroundComponent,
    reverse: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    src: null,
    track: null,
    trackLng: null,
    controls: true,
    image: null,
    text: null,
    background: null,
    reverse: false,
    renderFormat: 'view',
    className: null,
};

const Audio = ({
    src,
    track,
    trackLng,
    controls,
    image,
    text,
    background,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const isPlaceholder = renderFormat === 'placeholder';
    const props = {
        controls,
    };

    const textElement = isPlaceholder ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...text} className={styles.text} />
    );

    const imageElement = isPlaceholder ? (
        <Placeholders.Image className={styles.placeholder} />
    ) : (
        <ImageComponent {...image} className={styles.image} />
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
                    <div className={styles.inner}>
                        <audio {...props} src={src}>
                            {track !== null ? (
                                <track default kind="captions" srcLang={trackLng} src={track} />
                            ) : null}
                        </audio>
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default Audio;
