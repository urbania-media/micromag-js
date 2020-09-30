/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Video from '@micromag/element-video';
import Stack from '@micromag/element-stack';
import Grid from '@micromag/element-grid';
import TextComponent from '@micromag/element-text';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.textElement,
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    grid: MicromagPropTypes.boxElement,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    reverse: PropTypes.bool,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    video: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    reverse: false,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TextVideoScreen = ({
    text,
    video,
    box,
    grid,
    background,
    visible,
    active,
    textAlign,
    reverse,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { spacing = 10 } = box || {};
    const { isView, isPlaceholder, isPreview, isEditor } = getRenderFormat(renderFormat);
    const showEmpty = text === null && video === null;
    const isSimple = isPreview || isPlaceholder;

    let videoSize = {};
    if (video) {
        videoSize = {
            maxWidth: Math.min(width, 768) - spacing * 2,
            maxHeight: Math.min(height, 400) - spacing * 2,
        };
    }

    const textComponent =
        isEditor && !text ? (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
            </Empty>
        ) : (
            <TextComponent {...text} key="text-element" className={styles.text} />
        );

    const textElement = isPlaceholder ? (
        <Placeholders.Text key="text-element" className={styles.placeholderText} />
    ) : (
        textComponent
    );

    const videoElement = isSimple ? (
        <Placeholders.Video key="video-element" className={styles.placeholderVideo} />
    ) : (
        <Video
            {...video}
            {...videoSize}
            key="video-element"
            fit={{ size: 'contain' }}
            showEmpty={isEditor && showEmpty}
            className={styles.video}
            emptyClassName={styles.empty}
        />
    );

    const items = reverse ? [textElement, videoElement] : [videoElement, textElement];

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.box} />
                    ) : (
                        <Stack {...box} className={styles.box}>
                            {items}
                        </Stack>
                    )}
                </Container>
            </div>
        </div>
    );
};

TextVideoScreen.propTypes = propTypes;
TextVideoScreen.defaultProps = defaultProps;

export default React.memo(TextVideoScreen);
