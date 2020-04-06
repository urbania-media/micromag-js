/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
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
    defaultSpacing: PropTypes.number,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [],
    grid: null,
    defaultSpacing: 10,
    renderFormat: 'view',
    className: null,
};

const GalleryComponent = ({
    background,
    images,
    grid,
    defaultSpacing,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const { layout } = grid;
    const items = isSimple
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
            <Background {...background} width={width} height={height} className={styles.background}>
                <Frame width={width} height={height}>
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

GalleryComponent.propTypes = propTypes;
GalleryComponent.defaultProps = defaultProps;

export default GalleryComponent;
