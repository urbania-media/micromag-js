/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

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
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSimple]: isSimple,
                    [styles.disabled]: isSimple,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
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
                <Frame width={width} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple}>
                        <div className={styles.inner}>
                            {isPlaceholder ? (
                                <Placeholders.MediumImage className={styles.placeholderImage} />
                            ) : (
                                <ImageComponent
                                    {...image}
                                    maxWidth="100%"
                                    maxHeight="100%"
                                    className={styles.image}
                                    showEmpty={isEditor && image === null}
                                />
                            )}
                            {!isPlaceholder ? (
                                <div className={styles.textContainer}>
                                    <TextComponent {...text} />
                                </div>
                            ) : null}
                        </div>
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

ImageScreen.propTypes = propTypes;
ImageScreen.defaultProps = defaultProps;

export default React.memo(ImageScreen);
