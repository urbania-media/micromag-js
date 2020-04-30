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
    iframe: MicromagPropTypes.adFormat,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    iframe: {
        src: null,
        title: null,
        width: null,
        height: null,
    },
    box: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const AdSlotScreen = ({ iframe, box, background, visible, active, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const { src, title } = iframe;

    const preview = isSimple ? (
        <div className={styles.previewBlock} />
    ) : (
        <Image showEmpty={isEditor} />
    );

    const inner =
        src !== null && !isSimple ? (
            <iframe className={styles.iframe} src={src} title={title} />
        ) : (
            preview
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
                playing={isView || (isEditor && active)}
                className={styles.background}
            >
                <Frame className={styles.frame} width={width} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        {isPlaceholder ? <Placeholders.Ad className={styles.placeholder} /> : inner}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

AdSlotScreen.propTypes = propTypes;
AdSlotScreen.defaultProps = defaultProps;

export default React.memo(AdSlotScreen);
