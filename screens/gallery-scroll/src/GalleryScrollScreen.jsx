/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Image from '@micromag/element-image';
import Box from '@micromag/element-box';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundElement,
    images: MicromagPropTypes.images,
    box: MicromagPropTypes.boxElement,
    columns: PropTypes.arrayOf(PropTypes.number),
    spacing: PropTypes.number,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    box: null,
    columns: [1],
    spacing: 10,
    renderFormat: 'view',
    className: null,
};

const GalleryScrollScreen = ({
    background,
    images: imageList,
    columns,
    spacing,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);

    const images =
        imageList && imageList.length > 0 && !isPlaceholder
            ? imageList
            : [...Array(15)].map(() => null);

    const groups = [];
    let step = 0;
    let current = 0;
    let index = 0;

    images.forEach(image => {
        const max = columns[step];
        if (current < max) {
            current += 1;
        } else {
            index += 1;
            current = 1;
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

    const items = groups.map((its, i) => (
        <div key={`group-${i + 1}`} className={styles.group}>
            {its.map((it, j) => (
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
                    {isPlaceholder ? (
                        <Placeholders.Image key={`image-${j + 1}`} className={styles.placeholder} />
                    ) : (
                        <Image className={styles.imageComponent} {...it} />
                    )}
                </div>
            ))}
        </div>
    ));

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isSimple,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height} withScroll={!isSimple}>
                    <Box axisAlign="top" withSmallSpacing={isSimple} className={styles.box}>
                        {items}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

GalleryScrollScreen.propTypes = propTypes;
GalleryScrollScreen.defaultProps = defaultProps;

export default React.memo(GalleryScrollScreen);
