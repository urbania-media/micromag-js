/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Grid from '@micromag/element-grid';
import Image from '@micromag/element-image';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import layoutProps from './layouts';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = [
    'four-by-four',
    'one-plus-three',
    'one-plus-two',
    'six-by-two',
    'three-by-three',
    'two-by-two',
    'two-high',
    'two-plus-one',
    'two-wide',
];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    background: MicromagPropTypes.backgroundElement,
    images: MicromagPropTypes.images,
    defaultSpacing: PropTypes.number,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    background: null,
    images: [],
    defaultSpacing: 10,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const GalleryScreen = ({
    layout,
    images: imageList,
    background,
    visible,
    active,
    defaultSpacing,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);
    const grid = layout && layoutProps[layout] ? layoutProps[layout] : {};
    const { layout: gridLayout = [] } = grid || {};

    const defaultArray = [
        ...Array(16).map((i) => ({
            id: `image-${i}`,
            ...(imageList[i] ? imageList[i] : null),
        })),
    ];
    const images = isPreview ? imageList.slice(0, 16) : imageList || [];
    const activeImages = isEditor && imageList.length === 0 ? defaultArray : images;

    const items = isPlaceholder
        ? gridLayout
              .reduce((map, row) => [...map, ...row.columns], [])
              .map(() => <Placeholders.Image className={styles.placeholder} />)
        : activeImages.map((it) =>
              isEditor && !it ? (
                  <Empty className={styles.empty}>
                      <FormattedMessage {...messages.image} />
                  </Empty>
              ) : (
                  <Image {...it} fit={{ size: 'cover' }} contain className={styles.image} />
              ),
          );

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.placeholder]: isPlaceholder,
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    <div className={styles.images}>
                        <Grid
                            className={styles.grid}
                            spacing={defaultSpacing}
                            isSmall={isPlaceholder || isPreview}
                            items={items}
                            {...grid}
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
};

GalleryScreen.propTypes = propTypes;
GalleryScreen.defaultProps = defaultProps;

export default React.memo(GalleryScreen);
