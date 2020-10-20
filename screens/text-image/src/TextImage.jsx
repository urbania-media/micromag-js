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
import Layout from '@micromag/element-layout';
import Image from '@micromag/element-image';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse']),
    image: MicromagPropTypes.imageMedia,
    text: MicromagPropTypes.textElement,
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
    text: null,
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

const TextImage = ({
    layout,
    image,
    text,
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

    const { isView, isPlaceholder, isEdit } = useScreenRenderContext();
    
    const withImage = image !== null;
    const withText = text !== null;

    const isEmpty = isEdit && !withText && !withImage;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const isReversed = layout === 'reverse';

    const screenRatio = width / height;
    const maxWidth = maxRatio !== null && screenRatio > maxRatio ? height * maxRatio : width;
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
        (withText || isPlaceholder) && (
            <ScreenElement
                key="text"
                placeholder="text"
                emptyLabel={
                    <FormattedMessage defaultMessage="Text" description="Text placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Text {...text} />
            </ScreenElement>
        ),
    ];

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
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        playing={transitionPlaying}
                        disabled={!isView}
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

TextImage.propTypes = propTypes;
TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
