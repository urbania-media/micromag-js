/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

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
    visible: PropTypes.bool,
    active: PropTypes.bool,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    layout: PropTypes.string,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    image: null,
    background: null,
    visible: true,
    active: false,
    textAlign: 'center',
    layout: 'center',
    renderFormat: 'view',
    maxRatio: 3 / 4,
    className: null,
};

const TextImage = ({
    text,
    image,
    background,
    visible,
    active,
    textAlign,
    layout,
    renderFormat,
    maxRatio,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && image === null && text === null;

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
        justifyContent: stackContainerJustifyContent
    };

    const stackProps = {
        direction: stackDirection,
        reverse,
        itemClassName: styles.item
    };

    // Text element

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
            <TextComponent
                {...text}
                key="text-element"
                showEmpty={isEditor && text === null}
                className={styles.text}
                emptyClassName={styles.empty}
            />
        );
    }

    // Image element

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
            <ImageComponent
                image={image}
                key="image-element"
                fit={{ size: 'cover' }}
                className={styles.image}
            />
        );
    } 

    const items = [textElement, imageElement];

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.sideways]: sideways,
                [styles.isPlaceholder]: isPlaceholder,
                [styles.isEmpty]: isEmpty,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <Container width={width} height={height} visible={visible} maxRatio={maxRatio} styles={{textAlign}}>
                <div className={styles.stackContainer} style={stackContainerStyle}>
                    <StackNew className={styles.stack} {...stackProps}>
                        { items }
                    </StackNew>
                </div>
            </Container>
        </div>
    );
};

TextImage.propTypes = propTypes;
TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
