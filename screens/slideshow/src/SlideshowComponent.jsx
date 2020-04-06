/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Box from '@micromag/component-box';
import Image from '@micromag/component-image';
import TextComponent from '@micromag/component-text';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './slideshow.module.scss';

const propTypes = {
    items: MicromagPropTypes.slides,
    box: MicromagPropTypes.boxComponent,
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    box: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const SlideshowComponent = ({ box, items, background, renderFormat, className }) => {
    const { width, height, screens } = useScreenSize();
    const [index, setIndex] = useState(0);
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const onClickNext = useCallback(() => {
        if (index < items.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }, [items, index, setIndex]);

    const onClickPrevious = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(items.length - 1);
        }
    }, [items, index, setIndex]);

    return (
        <div
            className={classNames([
                styles.container,
                screens.map(size => styles[`screen-${size}`]),
                {
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        {isSimple ? (
                            <Placeholders.Slideshow />
                        ) : (
                            <>
                                <div className={styles.slides}>
                                    {items.map((item, i) => {
                                        let style = {
                                            zIndex: i,
                                        };
                                        const centered = i === index;
                                        const defaultZIndex = centered ? 1 : 0;
                                        const zIndex = i === index + 1 ? 2 : defaultZIndex;
                                        const display =
                                            i > index - 2 && i < index + 2 ? 'block' : 'none';

                                        style = {
                                            ...style,
                                            width: '100%',
                                            height: '50%',
                                            zIndex,
                                            display,
                                            visibility: display === 'none' ? 'hidden' : 'visible',
                                            transform: `translate3d(${
                                                centered ? 0 : width
                                            }px, 0px, 0px)`,
                                        };

                                        return (
                                            <div
                                                key={`slide-${i + 1}`}
                                                className={styles.slide}
                                                style={style}
                                            >
                                                {item.image ? <Image {...item.image} /> : null}
                                                {item.text ? (
                                                    <TextComponent {...item.text} />
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.controls}>
                                    <button
                                        className={styles.next}
                                        type="button"
                                        onClick={onClickNext}
                                    >
                                        Next
                                    </button>
                                    <button
                                        className={styles.previous}
                                        type="button"
                                        onClick={onClickPrevious}
                                    >
                                        Previous
                                    </button>
                                </div>
                            </>
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

SlideshowComponent.propTypes = propTypes;
SlideshowComponent.defaultProps = defaultProps;

export default SlideshowComponent;
