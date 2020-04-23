/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Grid from '@micromag/element-grid';
import Image from '@micromag/element-image';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

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
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    grid: null,
    defaultSpacing: 10,
    visible: true,
    renderFormat: 'view',
    className: null,
};

const GalleryScreen = ({
    background,
    images: imageList,
    grid,
    defaultSpacing,
    visible,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isPreview, isSimple } = getRenderFormat(renderFormat);

    const { layout } = grid;
    const images = isPreview ? imageList.slice(0, 16) : imageList || [];

    const items = isPlaceholder
        ? layout
              .reduce((map, row) => [...map, ...row.columns], [])
              .map(() => <Placeholders.Image className={styles.placeholder} />)
        : images.map(it => <Image {...it} className={styles.image} />);

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
            <Background {...background} width={width} height={height} className={styles.background}>
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
