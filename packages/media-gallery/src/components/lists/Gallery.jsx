/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';

import GalleryItem from '../items/GalleryItem';

import styles from '../../styles/lists/gallery.module.scss';

const propTypes = {
    items: MicromagPropTypes.medias,
    selectedItem: MicromagPropTypes.media,
    withInfoButton: PropTypes.bool,
    isSmall: PropTypes.bool,
    selectedFirst: PropTypes.bool,
    className: PropTypes.string,
    onClickItem: PropTypes.func,
    onClickItemInfo: PropTypes.func,
    onClickRemoveItem: PropTypes.func,
};

const defaultProps = {
    items: null,
    selectedItem: null,
    withInfoButton: false,
    isSmall: false,
    selectedFirst: false,
    className: null,
    onClickItem: null,
    onClickItemInfo: null,
    onClickRemoveItem: null,
};

function Gallery({
    items,
    selectedItem,
    withInfoButton,
    isSmall,
    selectedFirst,
    className,
    onClickItem,
    onClickItemInfo,
    onClickRemoveItem,
}) {
    const { ref, width } = useDimensionObserver();

    const finalItems = useMemo(() => {
        if (selectedFirst && selectedItem !== null && typeof selectedItem.id !== 'undefined') {
            return [selectedItem, ...items.filter(({ id }) => id !== selectedItem.id)];
        }
        return items;
    }, [selectedFirst, selectedItem, items]);

    return (
        <div
            className={classNames([
                styles.container,
                'p-2',
                {
                    [className]: className !== null,
                },
            ])}
            ref={ref}
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
                {finalItems.map((item) => (
                    <div className="col px-1 py-1" key={`gallery-item-${item.id}`}>
                        <GalleryItem
                            item={item}
                            width={width}
                            selected={selectedItem !== null && selectedItem.id === item.id}
                            onClick={onClickItem !== null ? () => onClickItem(item) : null}
                            onClickInfo={
                                onClickItemInfo !== null ? () => onClickItemInfo(item) : null
                            }
                            onClickRemove={
                                onClickRemoveItem !== null
                                    ? () => {
                                          onClickRemoveItem();
                                      }
                                    : null
                            }
                            withInfoButton={withInfoButton}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default Gallery;
