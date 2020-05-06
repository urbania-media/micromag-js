/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import GalleryItem from '../items/GalleryItem';

import styles from '../../styles/lists/gallery.module.scss';

const propTypes = {
    items: MicromagPropTypes.medias,
    selectedItem: MicromagPropTypes.media,
    withInfoButton: PropTypes.bool,
    isSmall: PropTypes.bool,
    className: PropTypes.string,
    onClickItem: PropTypes.func,
    onClickItemInfo: PropTypes.func,
};

const defaultProps = {
    items: null,
    selectedItem: null,
    withInfoButton: false,
    isSmall: false,
    className: null,
    onClickItem: null,
    onClickItemInfo: null,
};

const Gallery = ({
    items,
    selectedItem,
    withInfoButton,
    isSmall,
    className,
    onClickItem,
    onClickItemInfo,
}) => (
    <div
        className={classNames([
            styles.container,
            'p-2',
            {
                [className]: className !== null,
            },
        ])}
    >
        <div
            className={classNames([
                'row',
                'mx-n1',
                'row-cols-2',
                {
                    'row-cols-md-3': !isSmall,
                },
            ])}
        >
            {items.map(item => (
                <div className="col px-1 py-1" key={`gallery-item-${item.id}`}>
                    <GalleryItem
                        item={item}
                        selected={selectedItem !== null && selectedItem.id === item.id}
                        onClick={onClickItem !== null ? () => onClickItem(item) : null}
                        onClickInfo={onClickItemInfo !== null ? () => onClickItemInfo(item) : null}
                        withInfoButton={withInfoButton}
                    />
                </div>
            ))}
        </div>
    </div>
);

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default Gallery;
