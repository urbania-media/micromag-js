/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';

import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';

import {
    PlaceholderTitle,
    PlaceholderText,
    PlaceholderImage,
    PlaceholderSubtitle,
    PropTypes as MicromagPropTypes,
} from '@micromag/core';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

export const layouts = ['normal'];

const propTypes = {
    title: MicromagPropTypes.textElement,
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    background: MicromagPropTypes.backgroundElement,
    layout: PropTypes.oneOf(layouts),
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    items: null,
    background: null,
    layout: 'normal',
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

const TimelineDots = ({
    title,
    items,
    layout,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isEditor } = getRenderFormat(renderFormat);

    let elements = null;

    const hasItems = items !== null && items.length;
    const imagesCount = !isPlaceholder && hasItems ? items.reduce((acc, current) => acc + (current.image !== null && current.image !== undefined ? 1 : 0), 0) : 0;

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded === imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    if (isPlaceholder) {
        elements = (
            <>
                <PlaceholderTitle className={styles.placeholder} />
                <div className={styles.timelineContainer}>
                    <div className={styles.timelineBlock}>
                        <div className={styles.mainContent}>
                            <div className={styles.dot} />
                            <PlaceholderSubtitle className={styles.placeholder} />
                            <PlaceholderImage className={styles.placeholder} />
                            <PlaceholderText className={styles.placeholder} />
                        </div>
                    </div>
                    <div className={styles.timelineBlock}>
                        <div className={styles.mainContent}>
                            <div className={styles.dot} />
                            <PlaceholderSubtitle className={styles.placeholder} />
                            <PlaceholderText className={styles.placeholder} />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        elements = (
            <>
                { title !== null ? (
                    <div className={styles.title}>{title.body}</div>
                ) : null }
                <div className={styles.timelineBlocks}>
                    { hasItems ? items.map(({ text, image, heading }, index) => (
                        <div className={styles.timelineBlock} key={index}>
                            <div className={styles.mainContent}>
                                <div className={styles.dot} />
                                {heading !== null ? (
                                    <Heading                                        
                                        className={styles.heading}
                                        {...heading}
                                    />
                                ) : null}
                                {image !== null ? (
                                    <div
                                        className={styles.imageContainer}
                                    >
                                        <Image
                                            className={styles.image}
                                            {...image}
                                        />
                                    </div>
                                ) : null}
                                <TextComponent
                                    className={styles.item}
                                    {...text}
                                />
                            </div>
                        </div>
                    ))
                    : null }
                </div>
            </>
        )
    }

    return (
        <div className={classNames([
            styles.container,
            {
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
            <div className={styles.content}>
                <Container width={width} height={height} maxRatio={maxRatio}>
                    <div className={styles.inner}>
                        { elements }
                    </div>
                </Container>
            </div>
        </div>
    );
};

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;