/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Scroll from '@micromag/element-scroll';
import Image from '@micromag/element-image';
import { VStack, HStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundElement,
    images: MicromagPropTypes.images,
    box: MicromagPropTypes.boxElement,
    columns: PropTypes.arrayOf(PropTypes.number),
    spacing: PropTypes.number,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    box: null,
    columns: [1],
    spacing: 10,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const GalleryScrollScreen = ({
    images: imageList,
    columns,
    spacing,
    background,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const defaultArray = [
        ...Array(16).map((i) => ({
            id: `image-${i}`,
            ...(imageList[i] ? imageList[i] : null),
        })),
    ];
    const images =
        imageList && imageList.length > 0 && !isPlaceholder
            ? imageList
            : [...Array(16)].map(() => null);
    const currentImages = isEditor && imageList.length === 0 ? defaultArray : images;

    const groups = [];
    let step = 0;
    let row = 0;
    let index = 0;

    currentImages.forEach((image) => {
        const max = columns[step];
        if (row < max) {
            row += 1;
        } else {
            index += 1;
            row = 1;
            if (step < columns.length - 1) {
                step += 1;
            } else {
                step = 0;
            }
        }
        if (!groups[index]) {
            groups[index] = [];
        }
        groups[index].push(image);
    });

    const items = groups.map((its, i) => {
        const stackKey = `gallery-group-${i + 1}`;
        const stackItems = its.map((it, j) => {
            const isEmpty = it && it.image !== null;

            return (
                <div
                    key={`image-${j + 1}`}
                    className={classNames([
                        styles.image,
                        {
                            [styles[`columns${its.length}`]]: columns !== null,
                        },
                    ])}
                    style={{ padding: isPlaceholder ? 2 : spacing / 2 }}
                >
                    {isView || (isEditor && !isEmpty) ? (
                        <Image
                            {...it}
                            fit={{ size: 'cover' }}
                            contain
                            className={styles.imageComponent}
                        />
                    ) : null}
                    {isPreview ? <div className={styles.previewBlock} /> : null}
                    {isPlaceholder ? (
                        <Placeholders.Image key={`image-${j + 1}`} className={styles.placeholder} />
                    ) : null}
                    {isEditor && isEmpty ? (
                        <Empty className={styles.empty}>
                            <FormattedMessage {...messages.image} />
                        </Empty>
                    ) : null}
                </div>
            );
        });

        return (
            <HStack key={stackKey} horizontalAlign="space" verticalAlign="top">
                {stackItems}
            </HStack>
        );
    });

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Scroll>
                <Background
                    {...(!isPlaceholder ? background : null)}
                    width={width}
                    height={height}
                    playing={(isView && visible) || (isEditor && active)}
                />
                <div className={styles.content}>
                    <Container width={width} height={height} visible={visible}>
                        <VStack className={styles.box} verticalAlign="top">
                            {items}
                        </VStack>
                    </Container>
                </div>
            </Scroll>
        </div>
    );
};

GalleryScrollScreen.propTypes = propTypes;
GalleryScrollScreen.defaultProps = defaultProps;

export default React.memo(GalleryScrollScreen);
