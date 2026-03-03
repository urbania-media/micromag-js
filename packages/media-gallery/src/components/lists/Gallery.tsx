/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import type { Media } from '@micromag/core';
import { useDimensionObserver } from '@micromag/core/hooks';

import GalleryItem from '../items/GalleryItem';

import styles from '../../styles/lists/gallery.module.css';

interface GalleryProps {
    items?: Media[];
    selectedItem?: Media;
    withInfoButton?: boolean;
    isSmall?: boolean;
    selectedFirst?: boolean;
    className?: string;
    onClickItem?: (...args: unknown[]) => void;
    onClickItemInfo?: (...args: unknown[]) => void;
    onClickRemoveItem?: (...args: unknown[]) => void;
}

function Gallery({
    items = null,
    selectedItem = null,
    withInfoButton = false,
    isSmall = false,
    selectedFirst = false,
    className = null,
    onClickItem = null,
    onClickItemInfo = null,
    onClickRemoveItem = null,
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
                'pt-0',
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

export default Gallery;
