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

const Gallery = ({ items, withInfoButton, onClickItem, onClickItemInfo, className }) => {

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.grid}>
                {items.map((item, index) => {
                    return (
                        <GalleryItem
                            key={`gallery-item-${item.filename}`}
                            item={item}
                            onClick={e => (onClickItem !== null ?
                                    onClickItem(e, item, index)
                                : null)}
                            onClickInfo={e => {
                                if (onClickItemInfo !== null) {
                                    onClickItemInfo(e, item, index);
                                }
                            }}
                            withInfoButton={withInfoButton}
                        />
                    );
                })}
            </div>
        </div>
    );
};

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default Gallery;
