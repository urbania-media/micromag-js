import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMedias, useMediaCreate } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

// import * as AppPropTypes from '../lib/PropTypes';

import Navbar from './partials/Navbar';
import UploadModal from './partials/UploadModal';
import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';

import styles from '../styles/media-gallery.module.scss';

const propTypes = {
    type: PropTypes.string,
    isPicker: PropTypes.bool,
    isSmall: PropTypes.bool,
    medias: MicromagPropTypes.medias,
    selectedMedia: MicromagPropTypes.media,
    className: PropTypes.string,
    onClickMedia: PropTypes.func,
};

const defaultProps = {
    type: null,
    isPicker: false,
    isSmall: false,
    medias: null,
    selectedMedia: null,
    className: null,
    onClickMedia: null,
};

const MediaGallery = ({
    type,
    isPicker,
    isSmall,
    medias: initialMedias,
    selectedMedia,
    className,
    onClickMedia,
}) => {
    // Base state for filters
    const defaultFilters = {
        type,
        source: 'all',
    };

    // Filters
    const [filtersValue, setFiltersValue] = useState(defaultFilters);

    // Items
    const { allMedias: loadedMedias } = useMedias(filtersValue, 1, 100, {
        items: initialMedias,
    });

    // Temporary type filter
    const [addedMedias, setAddedMedias] = useState([]);
    const medias = useMemo(() => {
        const allMedias = [...addedMedias, ...(loadedMedias || [])];
        return allMedias.length > 0 ? allMedias : null;
    }, [loadedMedias, addedMedias]);

    // Medias
    const [metadataMedia, setMetadataMedia] = useState(null);
    const onClickItem = useCallback(
        (media) => {
            if (!isPicker) {
                setMetadataMedia(media);
            } else if (onClickMedia !== null) {
                onClickMedia(media);
            }
        },
        [isPicker, setMetadataMedia, onClickMedia],
    );
    const onClickItemInfo = useCallback((media) => setMetadataMedia(media), [setMetadataMedia]);
    const onMetadataClickClose = useCallback(() => setMetadataMedia(null), [setMetadataMedia]);

    // Navigation
    const onClickBack = useCallback(() => setMetadataMedia(null), [setMetadataMedia]);

    // Reset all filters except source
    const onClickCancel = useCallback(
        () => setFiltersValue({ ...defaultFilters, source: filtersValue.source || null }),
        [defaultFilters, filtersValue, setFiltersValue],
    );

    // Upload modal
    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const { create: createMedia } = useMediaCreate();
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);
    const onUploadCompleted = useCallback(
        (newMedias) => {
            Promise.all(newMedias.map(createMedia)).then((newAddedMedias) =>
                setAddedMedias([...addedMedias, ...newAddedMedias]),
            );
        },
        [createMedia, addedMedias, setAddedMedias],
    );
    const onUploadRequestClose = useCallback(() => setUploadModalOpened(false), [
        setUploadModalOpened,
    ]);

    // console.log('filters', filtersValue);

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
                onClickCancel={onClickCancel}
            />
            <div className={styles.content}>
                <div className={styles.gallery}>
                    {medias !== null ? (
                        <Gallery
                            items={medias}
                            selectedItem={selectedMedia}
                            withInfoButton={isPicker}
                            isSmall={isSmall}
                            onClickItem={onClickItem}
                            onClickItemInfo={onClickItemInfo}
                        />
                    ) : null}
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
