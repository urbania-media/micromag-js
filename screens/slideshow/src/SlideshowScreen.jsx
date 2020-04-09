/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Box from '@micromag/component-box';
import Image from '@micromag/component-image';
import Button from '@micromag/component-button';
import TextComponent from '@micromag/component-text';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { useSwipe } from '@micromag/core/hooks';

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

const SlideshowScreen = ({ box, items: slides, background, renderFormat, className }) => {
    const { width, height, screens } = useScreenSize();
    const maxWidth = Math.min(width, 500);
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const { items, bind, index, setIndex } = useSwipe({
        width: maxWidth,
        items: slides,
    });

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
                <Frame width={maxWidth} height={height}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        {isSimple ? (
                            <Placeholders.Slideshow />
                        ) : (
                            <>
                                <button {...bind()} type="button" className={styles.slides}>
                                    {items.map(({ display, visibility, transform, item }, i) => {
                                        return (
                                            <div
                                                key={i}
                                                style={{ display, visibility, transform }}
                                                className={styles.slide}
                                            >
                                                {item.image ? (
                                                    <Image {...item.image} maxWidth={width} />
                                                ) : null}
                                                {item.text ? (
                                                    <TextComponent {...item.text} />
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </button>
                                <div className={styles.controls}>
                                    <Button className={styles.next} onClick={onClickNext}>
                                        Next
                                    </Button>
                                    <Button className={styles.previous} onClick={onClickPrevious}>
                                        Previous
                                    </Button>
                                </div>
                            </>
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

SlideshowScreen.propTypes = propTypes;
SlideshowScreen.defaultProps = defaultProps;

export default SlideshowScreen;
