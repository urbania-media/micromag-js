/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { StackNew } from '@micromag/element-stack';
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

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = [
    'top',
    'top-reverse',
    'center',
    'center-reverse',
    'bottom',
    'bottom-reverse',
    'side',
    'side-reverse',
];

const propTypes = {
    text: MicromagPropTypes.textComponent,
    image: MicromagPropTypes.imageComponent,
    background: MicromagPropTypes.backgroundComponent,
    current: PropTypes.bool,
    active: PropTypes.bool,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    layout: PropTypes.string,
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
    textAlign: 'center',
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
    textAlign,
    layout,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && image === null && text === null;

    const withImage = isView || isPreview;
    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const finalLayout = layout !== null ? layout : 'center';
    const layoutArray = finalLayout.split('_');
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
        textElement = <PlaceholderShortText key="text-element" className={styles.placeholder} />;
    } else if (isEmpty) {
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
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
                    key="text-element"
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
        imageElement = <PlaceholderImage key="image-element" className={styles.placeholder} />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage {...messages.image} />
            </Empty>
        );
    } else {
        imageElement = (
            <Transitions
                playing={transitionPlaying}
                transitions={transitions}
                delay={!reverse ? 500 : 0}
            >
                <ImageComponent
                    {...image}
                    key="image-element"
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
            <Container width={width} height={height} maxRatio={maxRatio} styles={{ textAlign }}>
                <div
                    className={styles.stackContainer}
                    style={{
                        justifyContent: stackContainerJustifyContent,
                    }}
                >
                    <StackNew
                        className={styles.stack}
                        direction={stackDirection}
                        reverse={reverse}
                        itemClassName={styles.item}
                    >
                        {items}
                    </StackNew>
                </div>
            </Container>
        </div>
    );
};

TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
