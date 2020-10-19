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
    margin: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxImageRatio: PropTypes.number,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    image: null,
    title: null,
    margin: 20,
    background: null,
    current: true,
    active: true,
    renderFormat: 'view',
    maxImageRatio: 4 / 3,
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
    margin,
    background,
    current,
    active,
    renderFormat,
    maxImageRatio,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const withTitle = title !== null;
    const withImage = image !== null;
    const isEmpty = isEditor && !withTitle && !withImage;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    let items = [];

    if (isPlaceholder) {
        items = [<PlaceholderImage />, <PlaceholderTitle />];
    } else if (isEmpty) {
        items = [
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
            </Empty>,
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>,
        ];
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
            // get container size from screen maxRatio
            const currentRatio = width / height;
            const maxWidth = maxRatio !== null && currentRatio > maxRatio ? height * maxRatio : null;

            // get image container size
            const imageWidth = maxWidth - margin * 2;
            const imageHeight = imageWidth / maxImageRatio;

            items.push(
                createElement(
                    <ImageComponent
                        {...image}
                        width={imageWidth}
                        height={imageHeight}
                        shrinkHeight
                        objectFit={{ fit: 'contain' }}
                        onLoaded={onImageLoaded}
                    />,
                ),
            );
        }
        if (withTitle) {
            items.push(createElement(<Heading {...title} />));
        }
    }

    if (layout) {
        // @TODO
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
                <div style={{ margin }}>{items}</div>
            </Container>
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default React.memo(Image);
