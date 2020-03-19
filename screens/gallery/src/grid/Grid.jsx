/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Grid from '@micromag/component-grid';
import Image from '@micromag/component-image';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './grid.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    images: MicromagPropTypes.images,
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    isPlaceholder: PropTypes.bool,
    placeholderLayout: MicromagPropTypes.gridLayout,
    placeholderSpacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    grid: null,
    isPlaceholder: false,
    placeholderLayout: [
        {
            rows: 2,
            columns: [1],
        },
        {
            rows: 1,
            columns: [1, 1, 1],
        },
    ],
    placeholderSpacing: 20,
    className: null,
};

const GalleryGridLayout = ({
    background,
    images,
    grid,
    isPlaceholder,
    placeholderLayout,
    placeholderSpacing,
    className,
}) => {
    const { width, height } = useScreenSize();
    // console.log(width, height);
    const {
        layout = isPlaceholder ? placeholderLayout : null,
        spacing = isPlaceholder ? placeholderSpacing : null,
    } = grid || {};
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
                <Grid
                    layout={layout}
                    spacing={spacing || 0}
                    items={
                        isPlaceholder
                            ? layout
                                  .reduce((map, row) => [...map, ...row.columns], [])
                                  .map(() => <Placeholders.Image className={styles.placeholder} />)
                            : (images || []).map(it => <Image {...it} className={styles.image} />)
                    }
                    className={styles.grid}
                />
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

GalleryGridLayout.propTypes = propTypes;
GalleryGridLayout.defaultProps = defaultProps;

export default GalleryGridLayout;
