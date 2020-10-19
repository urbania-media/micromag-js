/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderShortText, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    // transitions: MicromagPropTypes.transitions, // @TODO transforme l'objet en string ???
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    background: null,
    layout: 'normal',
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
    transitionStagger: 100,
    className: null,
};

const TimelineCentered = ({
    items,
    background,
    layout,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isEdit } = useScreenRenderContext();

    let elements = null;

    const hasItems = items !== null && items.length;
    const imagesCount =
        !isPlaceholder && hasItems
            ? items.reduce(
                  (acc, current) =>
                      acc + (current.image !== null && current.image !== undefined ? 1 : 0),
                  0,
              )
            : 0;

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded === imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    if (isPlaceholder) {
        const placeholdersCount = 3;
        elements = Array.from(Array(placeholdersCount)).map((n, i) => (
            <div key={i} className={styles.placeholderContainer}>
                <PlaceholderShortText className={styles.placeholder} />
                {i < placeholdersCount - 1 ? <div className={styles.line} /> : null}
            </div>
        ));
    } else {
        let transitionDelay = 0;

        const createElement = (children) => {
            const element = (
                <Transitions
                    transitions={transitions}
                    playing={transitionPlaying}
                    delay={transitionDelay}
                >
                    {children}
                </Transitions>
            );
            transitionDelay += transitionStagger;
            return element;
        };

        elements = hasItems
            ? items.map(({ title, subtitle, image, text }, index) => (
                  <div className={styles.timelineBlock} key={index}>
                      {title !== null ? createElement(<Heading {...title} />) : null}
                      {subtitle !== null ? createElement(<Heading {...subtitle} size={3} />) : null}
                      {image !== null
                          ? createElement(
                                <Image
                                    className={styles.image}
                                    {...image}
                                    width="100%"
                                    onLoaded={onImageLoaded}
                                />,
                            )
                          : null}
                      {text !== null ? createElement(<TextComponent {...text} />) : null}
                      {index < items.length - 1
                          ? createElement(<div className={styles.line} />)
                          : null}
                  </div>
              ))
            : null;
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
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Scroll verticalAlign="center">{elements}</Scroll>
            </Container>
        </div>
    );
};

TimelineCentered.propTypes = propTypes;
TimelineCentered.defaultProps = defaultProps;

export default TimelineCentered;
