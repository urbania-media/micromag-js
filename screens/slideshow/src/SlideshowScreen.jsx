/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import Image from '@micromag/element-image';
import Button from '@micromag/element-button';
import TextComponent from '@micromag/element-text';

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
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);
    const maxWidth = Math.min(width, 500);

    const { items, bind, setIndex } = useSwipe({
        width: maxWidth,
        items: slides,
        disabled: isSimple,
        onIndexChange: setParallelIndex,
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
                        {isPlaceholder ? (
                            <Placeholders.Slideshow />
                        ) : (
                            <>
                                <button {...bind()} type="button" className={styles.slides}>
                                    {items.map(({ display, visibility, x }, i) => {
                                        if (isSimple && i > 0) return null;
                                        const item = slides[i];
                                        return (
                                            <div
                                                key={i}
                                                style={{
                                                    display: display.get(),
                                                    visibility: visibility.get(),
                                                    transform: `translate3d(${x.get()}px, 0px, 0px)`,
                                                }}
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
                                {items.length > 1 ? (
                                    <div className={styles.controls}>
                                        <Button
                                            className={styles.next}
                                            disabled={isSimple}
                                            onClick={onClickNext}
                                        >
                                            Next
                                        </Button>
                                        <Button
                                            className={styles.previous}
                                            disabled={isSimple}
                                            onClick={onClickPrevious}
                                        >
                                            Previous
                                        </Button>
                                    </div>
                                ) : null}
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

export default React.memo(SlideshowScreen);
