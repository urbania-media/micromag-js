/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import { PropTypes as MicromagPropTypes, PlaceholderAdImage, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat, getLayoutParts } from '@micromag/core/utils';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

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
    renderFormat: MicromagPropTypes.renderFormat,
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

const Ad = ({
    layout,
    image,
    link,
    text,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();

    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = !image;
    const isFullScreen = layout === 'full';

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
                fullScreen={isFullScreen}
                renderFormat={renderFormat}
                onImageLoaded={onImageLoaded}
            />
        </Transitions>
    );

    if (isPlaceholder) {
        imageElement = (
            <PlaceholderAdImage
                className={classNames([styles.placeholder])}
                {...(isFullScreen
                    ? {
                          width: '100%',
                          height: '100%',
                      }
                    : null)}
            />
        );
    }

    if (isEditor && isEmpty) {
        imageElement = (
            <Empty className={styles.empty}>
                <FormattedMessage description="Ad title" defaultMessage="Advertising" />
            </Empty>
        );
    }

    const { horizontal, vertical } = getLayoutParts(layout);

    return (
        <div className={classNames([
            styles.container,
            {
                [styles.fullscreen]: isFullScreen,
                [styles.placeholder]: isPlaceholder,
                [styles[horizontal]]: horizontal !== null,
                [styles[vertical]]: vertical !== null,
                [className]: className !== null,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEditor && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>{imageElement}</div>
            </Container>
        </div>
    );
};

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default React.memo(Ad);
