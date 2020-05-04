/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Grid from '@micromag/element-grid';
import Image from '@micromag/element-image';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundElement,
    images: MicromagPropTypes.images,
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    defaultSpacing: PropTypes.number,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    grid: null,
    defaultSpacing: 10,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const GalleryScreen = ({
    background,
    images: imageList,
    grid,
    defaultSpacing,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isPreview, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    const { layout } = grid;
    const defaultArray = [
        ...Array(16).map(i => ({
            id: `image-${i}`,
            ...(imageList[i] ? imageList[i] : null),
        })),
    ];
    const images = isPreview ? imageList.slice(0, 16) : imageList || [];
    const activeImages = isEditor && imageList.length === 0 ? defaultArray : images;

    const items = isPlaceholder
        ? layout
              .reduce((map, row) => [...map, ...row.columns], [])
              .map(() => <Placeholders.Image className={styles.placeholder} />)
        : activeImages.map(it =>
              isEditor && !it ? (
                  <Empty className={styles.empty}>
                      <FormattedMessage {...messages.image} />
                  </Empty>
              ) : (
                  <Image image={it} fit={{ size: 'cover' }} contain className={styles.image} />
              ),
          );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [className]: className,
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
                    <div className={styles.images}>
                        <Grid
                            spacing={defaultSpacing}
                            {...grid}
                            withSmallSpacing={isSimple}
                            items={items}
                            className={styles.grid}
                        />
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

GalleryScreen.propTypes = propTypes;
GalleryScreen.defaultProps = defaultProps;

export default React.memo(GalleryScreen);
