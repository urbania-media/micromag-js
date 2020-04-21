/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import Image from '@micromag/element-image';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    ad: MicromagPropTypes.adFormat,
    box: MicromagPropTypes.box,
    background: MicromagPropTypes.backgroundElement,
    isFullScreen: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    ad: {
        width: null,
        height: null,
        url: null,
        target: '_blank',
        iframe: null,
        image: null,
    },
    box: null,
    background: null,
    isFullScreen: false,
    renderFormat: 'view',
    className: null,
};

const AdScreen = ({ ad, box, background, isFullScreen, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);
    const { width: adWidth, height: adHeight, url, iframe, image, target } = ad;

    const adStyle = {
        width: isFullScreen ? width : adWidth,
        height: isFullScreen ? height : adHeight,
    };

    const preview = isSimple ? <div className={styles.previewBlock} style={adStyle} /> : null;

    let inner = null;
    inner =
        iframe !== null && !isSimple ? (
            <iframe className={styles.iframe} src={iframe} title="iframe" />
        ) : (
            preview
        );

    inner =
        image !== null && !isSimple ? (
            <Image className={styles.content} image={{ ...image, ...adStyle }} alt="Ad" />
        ) : (
            preview
        );

    const content =
        url !== null ? (
            <a href={url} target={target} rel="noopener noreferer">
                {inner}
            </a>
        ) : (
            inner
        );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                className={styles.background}
            >
                <Frame className={styles.frame} width={width} height={height}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        {isPlaceholder ? (
                            <Placeholders.Ad className={styles.placeholder} />
                        ) : (
                            content
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default AdScreen;
