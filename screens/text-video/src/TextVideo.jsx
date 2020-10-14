/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Stack from '@micromag/element-stack';
import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import VideoComponent from '@micromag/element-video';
import TextComponent from '@micromag/element-text';

import Transitions from '@micromag/core/src/components/transitions/Transitions';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import {
    PropTypes as MicromagPropTypes,
    PlaceholderShortText,
    PlaceholderVideo,
    Empty,
} from '@micromag/core';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = [
    'top',
    'top-reverse',
    'center',
    'center-reverse',
    'bottom',
    'bottom-reverse',
    'side',
    'side-reverse',
];

const propTypes = {
    text: MicromagPropTypes.textElement,
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    layout: PropTypes.oneOf(layouts),
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    video: null,
    background: null,
    layout: 'center',
    textAlign: 'center',
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

const TextVideo = ({
    text,
    video,
    layout,
    background,
    current,
    active,
    textAlign,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const spacing = 10;
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const withText = text !== null;
    const withVideo = video !== null;

    const isEmpty = isEditor && !withVideo && !withText;

    // @TODO enlever le "|| true" après avoir fixé le <Video> qui trigger le onReady
    const [ready, setReady] = useState(!withVideo || true);
    const transitionPlaying = current && ready;

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const finalLayout = layout !== null ? layout : 'center';
    const layoutArray = finalLayout.split('-');
    const layoutName = layoutArray[0];
    const sideways = layoutName === 'side';
    const reverse = layoutArray.length === 2 && layoutArray[1] === 'reverse';
    const stackDirection = sideways ? 'horizontal' : 'vertical';

    let stackContainerJustifyContent = 'center';

    if (layoutName === 'top') {
        stackContainerJustifyContent = 'flex-start';
    } else if (layoutName === 'bottom') {
        stackContainerJustifyContent = 'flex-end';
    }
    // ???
    let videoSize = {};
    if (video !== null) {
        videoSize = {
            maxWidth: Math.min(width, 768) - spacing * 2,
            maxHeight: Math.min(height, 400) - spacing * 2,
        };
    }

    // Text

    let textElement = null;

    if (isPlaceholder) {
        textElement = <PlaceholderShortText className={styles.placeholder} />;
    } else if (isEmpty) {
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
            </Empty>
        );
    } else {
        textElement = (
            <Transitions
                playing={transitionPlaying}
                transitions={transitions}
                delay={reverse ? 500 : 0}
            >
                <TextComponent
                    {...text}
                    showEmpty={isEditor && text === null}
                    className={styles.text}
                    emptyClassName={styles.empty}
                />
            </Transitions>
        );
    }

    // Image
    let videoElement = null;

    if (isPlaceholder) {
        videoElement = <PlaceholderVideo className={styles.placeholder} />;
    } else if (isEmpty) {
        videoElement = (
            <Empty className={classNames([styles.empty, styles.emptyVideo])}>
                <FormattedMessage {...messages.image} />
            </Empty>
        );
    } else if (withVideo) {
        videoElement = (
            <Transitions
                playing={transitionPlaying}
                transitions={transitions}
                delay={!reverse ? 500 : 0}
            >
                <VideoComponent
                    {...video}
                    {...videoSize}
                    fit={{ size: 'contain' }}
                    showEmpty={isEmpty}
                    className={styles.video}
                    emptyClassName={styles.empty}
                    onReady={onVideoReady}
                />
            </Transitions>
        );
    }

    const items = [textElement, videoElement];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles[textAlign]]: textAlign !== null,
                    [styles.sideways]: sideways,
                    [styles.ready]: ready && active,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEditor && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.stackContainer}
                    style={{
                        justifyContent: stackContainerJustifyContent,
                    }}
                >
                    <Stack
                        className={styles.stack}
                        direction={stackDirection}
                        reverse={reverse}
                        itemClassName={styles.item}
                    >
                        {items.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </Stack>
                </div>
            </Container>
        </div>
    );
};

TextVideo.propTypes = propTypes;
TextVideo.defaultProps = defaultProps;

export default React.memo(TextVideo);
