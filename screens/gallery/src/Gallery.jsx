/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Grid from '@micromag/element-grid';
import Image from '@micromag/element-image';

import { PropTypes as MicromagPropTypes, PlaceholderImage, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import layoutProps from './layouts';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'four-by-four',
        'one-plus-three',
        'one-plus-two',
        'six-by-two',
        'three-by-three',
        'two-by-two',
        'two-high',
        'two-plus-one',
        'two-wide',
    ]),
    background: MicromagPropTypes.backgroundElement,
    images: MicromagPropTypes.imageMedias,
    defaultSpacing: PropTypes.number,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    background: null,
    images: [],
    defaultSpacing: 10,
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    transitionStagger: 75,
    className: null,
};

const Gallery = ({
    layout,
    images: imageList,
    background,
    current,
    active,
    defaultSpacing,
    renderFormat,
    maxRatio,
    transitions,
    transitionStagger,
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
    const gridSpaces = gridLayout.reduce((acc, current) => acc + current.columns.length, 0);
    const images = isPreview ? imageList.slice(0, 16) : imageList || [];
    const activeImages = isEditor && imageList.length === 0 ? defaultArray : images;

    const imagesCount = Math.min(gridSpaces, activeImages.length);

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    let transitionDelay = 0;

    const items = isPlaceholder
        ? gridLayout
              .reduce((map, row) => [...map, ...row.columns], [])
              .map(() => (
                  <PlaceholderImage className={styles.placeholder} width="100%" height="100%" />
              ))
        : activeImages.map((it, index) => {
              const element =
                  isEditor && !it ? (
                      <Empty className={styles.empty}>
                          <FormattedMessage
                              defaultMessage="Image"
                              description="Image placeholder"
                          />
                      </Empty>
                  ) : (
                      <Transitions
                          transitions={transitions}
                          delay={transitionDelay}
                          playing={transitionPlaying}
                      >
                          <Image
                              {...it}
                              fit={{ size: 'cover' }}
                              contain
                              className={styles.image}
                              onLoaded={onImageLoaded}
                          />
                      </Transitions>
                  );
              transitionDelay += transitionStagger;
              return element;
          });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.placeholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <div className={styles.images}>
                        <Grid
                            className={styles.grid}
                            spacing={defaultSpacing}
                            isSmall={isPlaceholder || isPreview}
                            items={items}
                            {...grid}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default React.memo(Gallery);
