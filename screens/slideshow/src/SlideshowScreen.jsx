/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animated } from 'react-spring';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import ImageElement from '@micromag/element-image';
import ButtonElement from '@micromag/element-button';
import TextElement from '@micromag/element-text';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { useSwipe } from '@micromag/core/hooks';

import styles from './slideshow.module.scss';

const propTypes = {
    items: MicromagPropTypes.slides,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    textAlign: MicromagPropTypes.textAlign,
    visible: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    box: null,
    background: null,
    textAlign: 'left',
    visible: true,
    renderFormat: 'view',
    className: null,
};

const SlideshowScreen = ({
    box,
    items: slides,
    background,
    textAlign,
    visible,
    renderFormat,
    className,
}) => {
    const [parallelIndex, setParallelIndex] = useState(0);
    const { width, height, screens } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);
    const maxWidth = Math.min(width, 500);

    const { items, bind, setIndex } = useSwipe({
        width: maxWidth,
        items: slides,
        disabled: isSimple,
        onChangeEnd: setParallelIndex,
    });

    const onClickNext = useCallback(() => {
        if (parallelIndex < items.length - 1) {
            setIndex(parallelIndex + 1);
        } else {
            setIndex(0);
        }
    }, [items, parallelIndex, setIndex]);

    const onClickPrevious = useCallback(() => {
        if (parallelIndex > 0) {
            setIndex(parallelIndex - 1);
        } else {
            setIndex(items.length - 1);
        }
    }, [items, parallelIndex, setIndex]);

    const inner =
        isEditor && slides.length === 0 ? (
            <>
                <ImageElement maxWidth={width} showEmpty emptyClassName={styles.empty} />
                <TextElement showEmpty emptyClassName={styles.empty} />
            </>
        ) : (
            <>
                <button {...bind()} type="button" className={styles.slides}>
                    {items.map(({ display, visibility, x }, i) => {
                        if (isSimple && i > 0) return null;
                        const item = slides[i];
                        return (
                            <animated.div
                                key={i}
                                style={{
                                    display,
                                    visibility,
                                    x,
                                }}
                                className={styles.slide}
                            >
                                {item.image ? (
                                    <ImageElement {...item.image} maxWidth={width} />
                                ) : null}
                                {item.text ? <TextElement {...item.text} /> : null}
                            </animated.div>
                        );
                    })}
                </button>
                {items.length > 1 ? (
                    <div className={styles.controls}>
                        <ButtonElement
                            className={styles.previous}
                            disabled={isSimple}
                            onClick={onClickPrevious}
                        >
                            Previous
                        </ButtonElement>
                        <ButtonElement
                            className={styles.next}
                            disabled={isSimple}
                            onClick={onClickNext}
                        >
                            Next
                        </ButtonElement>
                    </div>
                ) : null}
            </>
        );

    return (
        <div
            className={classNames([
                styles.container,
                screens.map(size => styles[`screen-${size}`]),
                {
                    [styles.disabled]: isSimple,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={maxWidth} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        {isPlaceholder ? <Placeholders.Slideshow /> : inner}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

SlideshowScreen.propTypes = propTypes;
SlideshowScreen.defaultProps = defaultProps;

export default React.memo(SlideshowScreen);
