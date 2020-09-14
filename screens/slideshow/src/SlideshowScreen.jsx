/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { animated } from 'react-spring';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import ImageElement from '@micromag/element-image';
import ButtonElement from '@micromag/element-button';
import TextElement from '@micromag/element-text';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { useSwipe } from '@micromag/core/hooks';

import { schemas as messages } from './messages';

import styles from './slideshow.module.scss';

const propTypes = {
    slides: MicromagPropTypes.slides,
    button: MicromagPropTypes.buttonElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    textAlign: MicromagPropTypes.textAlign,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    slides: [],
    button: null,
    box: null,
    background: null,
    textAlign: 'left',
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const SlideshowScreen = ({
    slides,
    button,
    box,
    background,
    textAlign,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const [parallelIndex, setParallelIndex] = useState(0);
    const { width, height, screens } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const maxWidth = Math.min(width, 500);

    const { items, bind, setIndex } = useSwipe({
        width: maxWidth,
        items: slides,
        disabled: isSimple,
    });

    const onClickNext = useCallback(() => {
        if (parallelIndex < items.length - 1) {
            // setIndex(parallelIndex + 1);
            setParallelIndex(parallelIndex + 1);
        } else {
            setParallelIndex(0);
        }
    }, [items, parallelIndex, setParallelIndex]);

    const onClickPrevious = useCallback(() => {
        if (parallelIndex > 0) {
            setParallelIndex(parallelIndex - 1);
        } else {
            setParallelIndex(items.length - 1);
        }
    }, [items, parallelIndex, setParallelIndex]);

    useEffect(() => {
        setIndex(parallelIndex);
    }, [parallelIndex, setIndex]);

    const inner =
        isEditor && slides.length === 0 ? (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.schemaTitle} />
            </Empty>
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
                                    <ImageElement image={item.image} fit={{ size: 'cover' }} />
                                ) : null}
                                {item.text ? <TextElement body={item.text} /> : null}
                            </animated.div>
                        );
                    })}
                </button>
                {items.length > 1 ? (
                    <div className={styles.controls}>
                        <ButtonElement
                            {...button}
                            disabled={isSimple}
                            onClick={onClickPrevious}
                            className={styles.previous}
                        >
                            Previous
                        </ButtonElement>
                        <ButtonElement
                            {...button}
                            disabled={isSimple}
                            onClick={onClickNext}
                            className={styles.next}
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
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
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
