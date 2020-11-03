/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderShortText, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Text from '@micromag/element-text';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'normal',
        'title-image-description',
        'title-description-image',
        'image-title-description',
    ]),
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    background: MicromagPropTypes.backgroundElement,
    illustrated: PropTypes.bool,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    items: null,
    background: null,    
    illustrated: false,
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
    transitionStagger: 50,
    className: null,
};

const Timeline = ({
    layout,
    items,
    background,
    illustrated,
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
                  (acc, curr) => acc + (curr.image !== null && curr.image !== undefined ? 1 : 0),
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
            ? items.map(({ title, description, image }, index) => (
                <div className={styles.timelineBlock} key={index}>
                    {title !== null ? createElement(<Heading {...title} />) : null}
                    {image !== null
                        ? createElement(
                            <Image
                                className={styles.image}
                                {...image}
                                onLoaded={onImageLoaded}
                            />,
                        ) : null}
                    {description !== null ? createElement(<Text {...description} />) : null}
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

Timeline.propTypes = propTypes;
Timeline.defaultProps = defaultProps;

export default Timeline;
