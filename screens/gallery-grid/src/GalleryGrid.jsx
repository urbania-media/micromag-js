/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Grid from '@micromag/component-grid';
import Image from '@micromag/component-image';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    images: MicromagPropTypes.images,
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    grid: null,
    isPlaceholder: false,
    isPreview: false,
    className: null,
};

const GalleryGrid = ({ background, images, grid, isPlaceholder, className }) => {
    const { width, height } = useScreenSize();
    const { layout } = grid;
    const items = isPlaceholder
        ? layout
              .reduce((map, row) => [...map, ...row.columns], [])
              .map(() => <Placeholders.Image className={styles.placeholder} />)
        : (images || []).map(it => <Image {...it} className={styles.image} />);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.images}>
                <Grid {...grid} items={items} className={styles.grid} />
            </div>
            <Background
                {...background}
                width={width}
                height={height}
                className={styles.background}
            />
        </div>
    );
};

GalleryGrid.propTypes = propTypes;
GalleryGrid.defaultProps = defaultProps;

export default GalleryGrid;
