/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import ImageComponent from '@micromag/element-image';
import Heading from '@micromag/element-heading';

import {
    PropTypes as MicromagPropTypes,
    PlaceholderImage,
    PlaceholderTitle,
    Empty,
} from '@micromag/core';
import { getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'top',
        'top-reverse',
        'center',
        'center-reverse',
        'bottom',
        'bottom-reverse',
        'split-reverse',
        'split',
    ]),
    image: MicromagPropTypes.imageMedia,
    title: MicromagPropTypes.headingElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    image: null,
    title: null,
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
    transitionStagger: 100,
    className: null,
};

const Image = ({
    layout,
    image,
    title,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isPreview, isEditor } = getRenderFormat(renderFormat);

    const withTitle = title !== null;
    const withImage = image !== null;
    const isEmpty = isEditor && !withTitle && !withImage;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const finalLayout = layout !== null ? layout : 'center';
    const layoutArray = finalLayout.split('-');
    const layoutName = layoutArray[0];
    const reverse = layoutArray.length === 2 && layoutArray[1] === 'reverse';

    let imageElement = null;
    let titleElement = null;

    if (isPlaceholder) {
        imageElement = <PlaceholderImage />;
        titleElement = <PlaceholderTitle />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
            </Empty>
        );
        titleElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>
        );
    } else {
        let transitionDelay = 0;

        const createElement = (children) => {
            const element = (
                <Transitions
                    transitions={transitions}
                    delay={transitionDelay}
                    playing={transitionPlaying}
                >
                    {children}
                </Transitions>
            );
            transitionDelay += transitionStagger;
            return element;
        };

        if (withImage) {
            imageElement = createElement(<ImageComponent {...image} onLoaded={onImageLoaded} />);
        }
        if (withTitle) {
            titleElement = createElement(<Heading {...title} />);
        }
    }

    let contentJustifyContentValue;
    const contentFlexDirection = 'column' + (reverse ? '-reverse' : '');

    switch (layoutName) {
        default:
        case 'center':
            contentJustifyContentValue = 'center';
            break;
        case 'top':
            contentJustifyContentValue = reverse ? 'flex-end' : 'flex-start';
            break;
        case 'bottom':
            contentJustifyContentValue = reverse ? 'flex-start' : 'flex-end';
            break;
        case 'split':
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
                        flexDirection: contentFlexDirection,
                        justifyContent: contentJustifyContentValue,
                    }}
                >
                    {imageElement}
                    {titleElement}
                </div>
            </Container>
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default React.memo(Image);
