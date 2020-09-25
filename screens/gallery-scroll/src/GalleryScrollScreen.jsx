/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Screen from '@micromag/element-screen';
import Image from '@micromag/element-image';
import Stack from '@micromag/element-stack';

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
    const size = useScreenSize();
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);

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

    const items = groups.map((its, i) => (
        <div key={`group-${i + 1}`} className={styles.group}>
            {its.map((it, j) => {
                const item =
                    isEditor && !it ? (
                        <Empty className={styles.empty}>
                            <FormattedMessage {...messages.image} />
                        </Empty>
                    ) : (
                        <Image
                            image={it}
                            fit={{ size: 'cover' }}
                            contain
                            className={styles.imageComponent}
                        />
                    );
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
                        {isPlaceholder ? (
                            <Placeholders.Image
                                key={`image-${j + 1}`}
                                className={styles.placeholder}
                            />
                        ) : (
                            item
                        )}
                    </div>
                );
            })}
        </div>
    ));

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.isPlaceholder]: isSimple,
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
            <Stack axisAlign="top" isSmall={isSimple} className={styles.box}>
                {items}
            </Stack>
        </Screen>
    );
};

GalleryScrollScreen.propTypes = propTypes;
GalleryScrollScreen.defaultProps = defaultProps;

export default React.memo(GalleryScrollScreen);
