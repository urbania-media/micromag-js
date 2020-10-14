/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';

import { PropTypes as MicromagPropTypes, PlaceholderImage, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = ['center', 'top', 'bottom'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    image: MicromagPropTypes.imageMedia,
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    textAlign: MicromagPropTypes.textAlign,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    image: null,
    text: null,
    background: null,
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

const Image = ({
    layout,
    image,
    text,
    background,
    textAlign,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isPreview, isEditor } = getRenderFormat(renderFormat);

    const withText = text !== null;
    const withImage = image !== null;
    const isEmpty = isEditor && !withText && !withImage;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    let imageElement = null;
    if (isPlaceholder) {
        imageElement = <PlaceholderImage className={styles.placeholderImage} />;
    } else if (isEmpty) {
        imageElement = (
            <Empty invertColor className={classNames([styles.image, styles.empty])}>
                <FormattedMessage {...messages.image} />
            </Empty>
        );
    } else if (withImage) {
        imageElement = (
            <Transitions transitions={transitions} playing={transitionPlaying}>
                <ImageComponent {...image} onLoaded={onImageLoaded} />
            </Transitions>
        );
    }

    let textElement = null;

    if ((isView || isPreview) && withText) {
        textElement = (
            <Transitions transitions={transitions} playing={transitionPlaying}>
                <div className={styles.textContainer}>
                    <TextComponent {...text} />
                </div>
            </Transitions>
        );
    }

    let contentJustifyContentValue;

    switch (layout) {
        default:
        case 'center':
            contentJustifyContentValue = 'center';
            break;
        case 'top':
            contentJustifyContentValue = 'flex-start';
            break;
        case 'bottom':
            contentJustifyContentValue = 'flex-end';
            break;
        case 'around':
            contentJustifyContentValue = 'space-around';
            break;
        case 'between':
            contentJustifyContentValue = 'space-between';
            break;
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles[textAlign]]: textAlign !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.content}
                    style={{
                        justifyContent: contentJustifyContentValue,
                    }}
                >
                    { imageElement }
                    { textElement }
                </div>
            </Container>
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default React.memo(Image);
