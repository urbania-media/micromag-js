/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Stack from '@micromag/element-stack';
import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';

import Transitions from '@micromag/core/src/components/transitions/Transitions';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import {
    PropTypes as MicromagPropTypes,
    PlaceholderShortText,
    PlaceholderImage,
    Empty,
} from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'center',
        'center-reverse',
        'top',
        'top-reverse',
        'bottom',
        'bottom-reverse',
        'side',
        'side-reverse',
    ]),
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    image: null,
    background: null,
    current: true,
    active: true,
    layout: 'center',
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

const TextImage = ({
    text,
    image,
    background,
    current,
    active,
    layout,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const withText = text !== null;
    const withImage = image !== null;

    const isEmpty = isEditor && !withImage && !withText;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const finalLayout = layout !== null ? layout : 'center';
    const layoutArray = finalLayout.split('-');
    const layoutName = layoutArray[0];
    const sideways = layoutName === 'side';
    const reverse = layoutArray.length === 2 && layoutArray[1] === 'reverse';
    const stackDirection = sideways ? 'horizontal' : 'vertical';

    let stackContainerJustifyContent = 'center';

    if (layoutName === 'top') {
        stackContainerJustifyContent = 'flex-start';
    } else if (layoutName === 'bottom') {
        stackContainerJustifyContent = 'flex-end';
    }

    // Text

    let textElement = null;

    if (isPlaceholder) {
        textElement = <PlaceholderShortText className={styles.placeholder} />;
    } else if (isEmpty) {
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Text" description="Text placeholder" />
            </Empty>
        );
    } else {
        textElement = (
            <Transitions
                playing={transitionPlaying}
                transitions={transitions}
                delay={reverse ? 500 : 0}
            >
                <TextComponent
                    {...text}
                    showEmpty={isEditor && text === null}
                    className={styles.text}
                    emptyClassName={styles.empty}
                />
            </Transitions>
        );
    }

    // Image
    let imageElement = null;

    if (isPlaceholder) {
        imageElement = <PlaceholderImage className={styles.placeholder} />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
            </Empty>
        );
    } else if (withImage) {
        imageElement = (
            <Transitions
                playing={transitionPlaying}
                transitions={transitions}
                delay={!reverse ? 500 : 0}
            >
                <ImageComponent
                    {...image}
                    fit={{ size: 'cover' }}
                    className={styles.image}
                    onLoaded={onImageLoaded}
                />
            </Transitions>
        );
    }

    const items = [textElement, imageElement];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles.sideways]: sideways,
                    [styles.ready]: ready && active,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.content}
                    style={{
                        justifyContent: stackContainerJustifyContent,
                    }}
                >
                    <Stack
                        className={styles.stack}
                        direction={stackDirection}
                        reverse={reverse}
                        itemClassName={styles.item}
                    >
                        {items.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </Stack>
                </div>
            </Container>
        </div>
    );
};

TextImage.propTypes = propTypes;
TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
