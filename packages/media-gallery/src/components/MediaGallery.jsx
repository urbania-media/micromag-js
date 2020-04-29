import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useItems } from '@micromag/core/hooks';

import * as AppPropTypes from '../lib/PropTypes';

import Navbar from './partials/Navbar';
import UploadModal from './partials/UploadModal';
import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';

import styles from '../styles/media-gallery.module.scss';

const propTypes = {
    items: AppPropTypes.medias,
    getItems: PropTypes.func,
    getItemsPage: PropTypes.func,
    isPicker: PropTypes.bool,
    className: PropTypes.string,
    onClickMedia: PropTypes.func,
};

const defaultProps = {
    items: [],
    getItems: null,
    getItemsPage: null,
    isPicker: false,
    className: null,
    onClickMedia: null,
};

const MediaGallery = ({
    items: initialItems,
    getItems,
    getItemsPage,
    isPicker,
    className,
    onClickMedia,
}) => {
    // Filters
    const [filtersValue, setFiltersValue] = useState(null);

    // Items
    const getItemsWithFilters = useMemo(
        () => (getItems !== null ? () => getItems(filtersValue) : null),
        [filtersValue, getItems],
    );
    const getItemsPageWithFilters = useMemo(
        () => (getItemsPage !== null ? (...args) => getItemsPage(filtersValue, ...args) : null),
        [filtersValue, getItemsPage],
    );
    const { items } = useItems({
        items: initialItems,
        getItems: getItemsWithFilters,
        getPage: getItemsPageWithFilters,
    });

    // Medias
    const [metadataMedia, setMetadataMedia] = useState(null);
    const onClickItem = useCallback(
        media => {
            if (!isPicker) {
                setMetadataMedia(media);
            } else if (onClickMedia !== null) {
                onClickMedia(media);
            }
        },
        [isPicker, setMetadataMedia, onClickMedia],
    );
    const onClickItemInfo = useCallback(media => setMetadataMedia(media), [setMetadataMedia]);
    const onMetadataClickClose = useCallback(() => setMetadataMedia(null), [setMetadataMedia]);
    const onClickBack = useCallback(() => setMetadataMedia(null), [setMetadataMedia]);

    // Upload modal
    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);
    const onUploadCompleted = useCallback(medias => {
        console.log(medias);
    }, []);
    const onUploadRequestClose = useCallback(() => setUploadModalOpened(false), [
        setUploadModalOpened,
    ]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.metadataOpened]: metadataMedia !== null,
                    [className]: className,
                },
            ])}
        >
            <Navbar
                filters={filtersValue}
                media={metadataMedia}
                onFiltersChange={setFiltersValue}
                onClickAdd={onClickAdd}
                onClickBack={onClickBack}
            />

            <div className={styles.content}>
                <div className={styles.gallery}>
                    <Gallery
                        items={items}
                        withInfoButton={isPicker}
                        onClickItem={onClickItem}
                        onClickItemInfo={onClickItemInfo}
                    />
                </div>

                <div className={styles.mediaMetadata}>
                    <MediaMetadata media={metadataMedia} onClickClose={onMetadataClickClose} />
                </div>
            </div>

            <UploadModal
                opened={uploadModalOpened}
                onUploaded={onUploadCompleted}
                onRequestClose={onUploadRequestClose}
            />
        </div>
    );
};

MediaGallery.propTypes = propTypes;
MediaGallery.defaultProps = defaultProps;

export default MediaGallery;
