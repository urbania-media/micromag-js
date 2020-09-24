/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import Screen from '@micromag/element-screen';
import Stack from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    image: MicromagPropTypes.image,
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    textAlign: MicromagPropTypes.textAlign,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    text: null,
    box: null,
    background: null,
    textAlign: 'center',
    visible: true,
    active: true,
    renderFormat: 'view',
    className: null,
};

const ImageScreen = ({
    image,
    text,
    box,
    background,
    textAlign,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const size = useScreenSize();
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && image === null && text === null;

    const imageElement = isEmpty ? (
        <Empty invertColor className={classNames([styles.image, styles.empty])}>
            <FormattedMessage {...messages.image} />
        </Empty>
    ) : (
        <ImageComponent {...image} />
    );

    const textElement = isEmpty ? null : (
        <div className={styles.textContainer}>
            <TextComponent {...text} />
        </div>
    );

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <Screen
            size={size}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
            <Stack {...box} isSmall={isSimple} className={styles.inner}>
                {isPlaceholder ? (
                    <Placeholders.MediumImage className={styles.placeholderImage} />
                ) : (
                    imageElement
                )}
                {isPlaceholder ? null : textElement}
            </Stack>
        </Screen>
    );
};

ImageScreen.propTypes = propTypes;
ImageScreen.defaultProps = defaultProps;

export default React.memo(ImageScreen);
