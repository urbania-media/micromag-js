/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Image from '@micromag/component-image';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    images: MicromagPropTypes.images,
    box: MicromagPropTypes.boxComponent,
    columns: PropTypes.arrayOf(PropTypes.number),
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    images: [null, null, null, null, null, null, null],
    box: null,
    columns: [1],
    renderFormat: 'view',
    className: null,
};

const GalleryScroll = ({ background, images, columns, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

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

    const items = isSimple
        ? groups.map((its, i) => (
            <div key={`group-${i + 1}`} className={styles.group}>
                {its.map((it, j) => (
                    <div
                        key={`image-${j + 1}`}
                        className={classNames([
                              styles.placeholder,
                              {
                                  [styles[`columns${its.length}`]]: columns !== null,
                              },
                          ])}
                      >
                        <Placeholders.Image />
                    </div>
                  ))}
            </div>
          ))
        : groups.map((its, i) => (
            <div key={`group-${i + 1}`} className={styles.group}>
                {its.map((it, j) => (
                    <Image
                        key={`image-${j + 1}`}
                        {...it}
                        className={classNames([
                              styles.image,
                              {
                                  [styles[`columns${its.length}`]]: columns !== null,
                              },
                          ])}
                      />
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
                    {items}
                </Frame>
            </Background>
        </div>
    );
};

GalleryScroll.propTypes = propTypes;
GalleryScroll.defaultProps = defaultProps;

export default GalleryScroll;
