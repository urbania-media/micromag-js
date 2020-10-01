/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import {useTransition, animated} from 'react-spring';

import { StackNew } from '@micromag/element-stack';
import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

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
    defaultTransitionParams: MicromagPropTypes.transitionParams,
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
        in: 'fade',
        out: 'scale',
    },
    defaultTransitionParams: { duration: 0.4, easing: 'ease' },
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
    defaultTransitionParams,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && image === null && text === null;

    const withImage = isView || isPreview;
    const [ready, setReady] = useState(!withImage);
    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const finalLayout = layout !== null ? layout : 'center';
    const layoutArray = finalLayout.split('_');
    const layoutName = layoutArray[0];
    const sideways = layoutName === 'side';
    const reverse = layoutArray.length === 2 && layoutArray[1] === 'reverse';
    const stackDirection = sideways ? 'horizontal' : 'vertical';

    let stackContainerJustifyContent = null;

    if (layoutName === 'top') {
        stackContainerJustifyContent = 'flex-start';
    } else if (layoutName === 'bottom') {
        stackContainerJustifyContent = 'flex-end';
    } else {
        stackContainerJustifyContent = 'center';
    }

    const stackContainerStyle = {
        justifyContent: stackContainerJustifyContent,
    };

    const stackProps = {
        direction: stackDirection,
        reverse,
        itemClassName: styles.item,
    };

    // Transitions

    const [animationCurrent, setAnimationCurrent] = useState(!current);
    const animating = animationCurrent === current;

    useEffect( () => {
        if (!ready) {
            return;
        }
        setAnimationCurrent(current);
    }, [current, ready]);

    const finalTransitions = { in: null, out: null };
    Object.keys(transitions).forEach((transitionKey) => {
        const currentTransition = transitions[transitionKey];
        const transition =
            typeof currentTransition === 'string' ? { name: currentTransition } : currentTransition;
        finalTransitions[transitionKey] = { ...defaultTransitionParams, ...transition };
    });

    const currentTransition = finalTransitions[current ? 'in' : 'out'];
    const {
        name: transitionName = null,
        duration: transitionDuration = 0,
        easing: transitionEasing = null,
    } = currentTransition || {};

    const transitionStyle = {
        transitionDuration: `${animating ? transitionDuration : 0}s`,
        transitionTimingFunction: transitionEasing,
    };

    // console.log(transitionName, current, animationCurrent, animating)

    // Text

    let textElement = null;

    if (isPlaceholder) {
        textElement = (
            <div className={styles.placeholderContainer}>
                <Placeholders.ShortText key="text-element" className={styles.placeholder} />
            </div>
        );
    } else if (isEmpty) {
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
            </Empty>
        );
    } else {
        textElement = (
            <div className={styles.transitionText} style={{...transitionStyle /* , transitionDelay: reverse && animating ? `${transitionDuration}s` : 0 */ }}>
                <TextComponent
                    {...text}
                    key="text-element"
                    showEmpty={isEditor && text === null}
                    className={styles.text}
                    emptyClassName={styles.empty}
                />
            </div>
        );
    }

    // Image
    let imageElement = null;

    if (isPlaceholder) {
        imageElement = (
            <Placeholders.SmallImage key="image-element" className={styles.placeholderImage} />
        );
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage {...messages.image} />
            </Empty>
        );
    } else {
        imageElement = (
            <div className={styles.transitionImage} style={{...transitionStyle /* , transitionDelay: !reverse && animating ? `${transitionDuration}s` : 0 */ }}>
                <ImageComponent
                    {...image}
                    key="image-element"
                    fit={{ size: 'cover' }}
                    className={styles.image}
                    onLoaded={onImageLoaded}
                />
            </div>
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
                    [styles.current]: animationCurrent,
                    [styles[`${transitionName}Transition`]]: transitionName !== null,
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
                <div className={styles.stackContainer} style={stackContainerStyle}>
                    <StackNew className={styles.stack} {...stackProps}>
                        {items}
                    </StackNew>
                </div>
            </Container>
        </div>
    );
};

TextImage.propTypes = propTypes;
TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
