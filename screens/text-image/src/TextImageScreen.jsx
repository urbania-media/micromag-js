/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Box from '@micromag/element-box';
import Grid from '@micromag/element-grid';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
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
    box: MicromagPropTypes.boxComponent,
    grid: MicromagPropTypes.gridComponent,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    reverse: PropTypes.bool,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    image: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    reverse: false,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TextImageScreen = ({
    text,
    image,
    background,
    box,
    grid,
    textAlign,
    reverse,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && image === null && text === null;
    const { direction } = box;

    const textComponent = isEmpty ? (
        <Empty className={styles.empty}>
            <FormattedMessage {...messages.text} />
        </Empty>
    ) : (
        <TextComponent
            {...text}
            key="text-element"
            showEmpty={isEditor && text === null}
            className={styles.text}
            emptyClassName={styles.empty}
        />
    );

    const textElement = isPlaceholder ? (
        <div className={styles.placeholderContainer}>
            <Placeholders.ShortText key="text-element" className={styles.placeholder} />
        </div>
    ) : (
        textComponent
    );

    const imageComponent = isEmpty ? (
        <Empty className={classNames([styles.empty, styles.emptyImage])}>
            <FormattedMessage {...messages.image} />
        </Empty>
    ) : (
        <ImageComponent
            {...image}
            key="image-element"
            fit={{ size: 'cover' }}
            className={styles.image}
        />
    );

    const imageElement = isPlaceholder ? (
        <Placeholders.SmallImage key="image-element" className={styles.placeholderImage} />
    ) : (
        imageComponent
    );

    const items = reverse ? [textElement, imageElement] : [imageElement, textElement];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [styles.sideways]: direction === 'row',
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
                    {grid !== null ? (
                        <Grid {...grid} withSmallSpacing={isSimple} items={items} />
                    ) : (
                        <Box {...box} withSmallSpacing={isSimple}>
                            {items}
                        </Box>
                    )}
                </Frame>
            </Background>
        </div>
    );
};

TextImageScreen.propTypes = propTypes;
TextImageScreen.defaultProps = defaultProps;

export default React.memo(TextImageScreen);
