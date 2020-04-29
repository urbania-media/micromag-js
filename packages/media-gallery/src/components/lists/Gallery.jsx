/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import GalleryItem from '../items/GalleryItem';

import styles from '../../styles/lists/gallery.module.scss';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})),
    withInfoButton: PropTypes.bool,
    onClickItem: PropTypes.func,
    onClickItemInfo: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    withInfoButton: false,
    onClickItem: null,
    onClickItemInfo: null,
    className: null,
};

const Gallery = ({ items, withInfoButton, onClickItem, onClickItemInfo, className }) => (
    <div
        className={classNames([
            styles.container,
            'p-2',
            {
                [className]: className !== null,
            },
        ])}
    >
        <div className={classNames(['row', 'row-cols-2', 'row-cols-md-3'])}>
            {items.map(item => (
                <div className="col mb-4" key={`gallery-item-${item.id}`}>
                    <GalleryItem
                        item={item}
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
