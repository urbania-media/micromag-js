/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import { PropTypes as MicromagPropTypes, PlaceholderAdImage, Empty } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { getLayoutParts } from '@micromag/core/utils';
import { Transitions } from '@micromag/core/components';

import AdImage from './AdImage';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'center',
        'top',
        'bottom',
        'full',
        'center-left',
        'center-right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
    ]),
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    text: MicromagPropTypes.text,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    image: null,
    link: null,
    text: null,
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

const AdScreen = ({
    layout,
    image,
    link,
    text,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEdit } = useScreenRenderContext();

    const isEmpty = !image;
    const isFullscreen = layout === 'full';

    const [ready, setReady] = useState(isEmpty);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    let imageElement = (
        <Transitions transitions={transitions} playing={transitionPlaying}>
            <AdImage
                image={image}
                link={link}
                text={text}
                fullscreen={isFullscreen}
                onImageLoaded={onImageLoaded}
            />
        </Transitions>
    );

    if (isPlaceholder) {
        imageElement = (
            <PlaceholderAdImage
                className={classNames([styles.placeholder])}
                {...(isFullscreen
                    ? {
                          width: '100%',
                          height: '100%',
                      }
                    : null)}
            />
        );
    }

    if (isEdit && isEmpty) {
        imageElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Advertising" description="Ad title" />
            </Empty>
        );
    }

    const { horizontal, vertical } = getLayoutParts(layout);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.fullscreen]: isFullscreen,
                    [styles.placeholder]: isPlaceholder,
                    [styles[horizontal]]: horizontal !== null,
                    [styles[vertical]]: vertical !== null,
                    [className]: className !== null,
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
                <div className={styles.content}>{imageElement}</div>
            </Container>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
