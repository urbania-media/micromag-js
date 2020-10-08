/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Stack from '@micromag/element-stack';
import Grid from '@micromag/element-grid';

import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';

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
    maxRatio: PropTypes.number,
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
    maxRatio: 3 / 4,
    className: null,
};

const TextImageScreen = ({
    text,
    image,
    box,
    grid,
    background,
    visible,
    active,
    textAlign,
    reverse,
    renderFormat,
    maxRatio,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && image === null && text === null;
    const { direction } = box;

    let textElement = null;
    if (isPlaceholder) {
        textElement = (
            <div className={styles.placeholderContainer}>
                <PlaceholderShortText key="text-element" className={styles.placeholder} />
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

    let imageElement = null;
    if (isPlaceholder) {
        imageElement = <PlaceholderImage key="image-element" className={styles.placeholderImage} />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage {...messages.image} />
            </Empty>
        );
    } else {
        imageElement = (
            <ImageComponent
                {...image}
                key="image-element"
                fit={{ size: 'cover' }}
                className={styles.image}
            />
        );
    }

    const items = reverse ? [textElement, imageElement] : [imageElement, textElement];

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.sideways]: direction === 'row',
            [styles[textAlign]]: textAlign !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible} maxRatio={maxRatio}>
                    {grid !== null ? (
                        <Grid {...grid} items={items} />
                    ) : (
                        <Stack {...box}>{items}</Stack>
                    )}
                </Container>
            </div>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
        </div>
    );
};

TextImageScreen.propTypes = propTypes;
TextImageScreen.defaultProps = defaultProps;

export default React.memo(TextImageScreen);
