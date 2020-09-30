/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import StackNew from '@micromag/element-stack';
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

    const textElement = useMemo(() => {
        if (isPlaceholder) {
            return (
                <div className={styles.placeholderContainer}>
                    <Placeholders.ShortText key="text-element" className={styles.placeholder} />
                </div>
            );
        }
        if (isEmpty) {
            return (
                <Empty className={styles.empty}>
                    <FormattedMessage {...messages.text} />
                </Empty>
            );
        }
        return (
            <TextComponent
                {...text}
                key="text-element"
                showEmpty={isEditor && text === null}
                className={styles.text}
                emptyClassName={styles.empty}
            />
        );
    }, [isPlaceholder, isEmpty, isEditor, text]);

    const imageElement = useMemo(() => {
        if (isPlaceholder) {
            return (
                <Placeholders.SmallImage key="image-element" className={styles.placeholderImage} />
            );
        }
        if (isEmpty) {
            return (
                <Empty className={classNames([styles.empty, styles.emptyImage])}>
                    <FormattedMessage {...messages.image} />
                </Empty>
            );
        }
        return (
            <ImageComponent
                image={image}
                key="image-element"
                fit={{ size: 'cover' }}
                className={styles.image}
            />
        );
    }, [isPlaceholder, isEmpty, image]);

    const items = [imageElement, textElement];
    const layoutArray = layout.split('_');
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
        reverse
    };

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.sideways]: sideways,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible} maxRatio={maxRatio} styles={{textAlign}}>
                    <div className={styles.stackContainer} style={stackContainerStyle}>
                        <StackNew {...stackProps}>{items.map(item => 
                            <div className={styles.stackItem}>
                                { item }
                            </div>
                        )}</StackNew>
                    </div>
                </Container>
            </div>
        </div>
    );
};

TextImage.propTypes = propTypes;
TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
