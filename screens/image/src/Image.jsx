/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse']),
    image: MicromagPropTypes.imageMedia,
    title: MicromagPropTypes.headingElement,
    padding: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    maxImageRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    image: null,
    title: null,
    padding: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    maxImageRatio: 5 / 6,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const ImageScreen = ({
    layout,
    image,
    title,
    padding,
    background,
    current,
    active,
    maxRatio,
    maxImageRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const screenRatio = width / height;
    const maxWidth = maxRatio !== null && screenRatio > maxRatio ? height * maxRatio : width;

    const { isView, isPlaceholder, isEdit } = useScreenRenderContext();

    const withTitle = title !== null;
    const withImage = image !== null;

    const isEmpty = isEdit && !withTitle && !withImage;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const isReversed = layout === 'reverse';

    const imageWidth = maxWidth - padding * 2;
    const imageHeight = imageWidth / maxImageRatio;

    const items = [
        (withImage || isPlaceholder) && (
            <ScreenElement
                key="image"
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Image
                    {...image}
                    width={imageWidth}
                    height={imageHeight}
                    shrinkHeight
                    objectFit={{ fit: 'contain' }}
                    onLoaded={onImageLoaded}
                />
            </ScreenElement>
        ),
        (withTitle || isPlaceholder) && (
            <ScreenElement
                key="title"
                placeholder="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Heading {...title} />
            </ScreenElement>
        ),

        isReversed && !withTitle && <Spacer />,
    ].filter(Boolean);

    if (isReversed) {
        items.reverse();
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    width={maxWidth}
                    height={height}
                    distribution="between"
                    style={isView ? { padding } : null}
                >
                    {isView ? (
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            playing={transitionPlaying}
                        >
                            {items}
                        </TransitionsStagger>
                    ) : (
                        items
                    )}
                </Layout>
            </Container>
        </div>
    );
};

ImageScreen.propTypes = propTypes;
ImageScreen.defaultProps = defaultProps;

export default React.memo(ImageScreen);
