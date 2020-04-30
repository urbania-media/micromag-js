import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMedias, useCreateMedia } from '@micromag/data';

import * as AppPropTypes from '../lib/PropTypes';

import Navbar from './partials/Navbar';
import UploadModal from './partials/UploadModal';
import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';

import styles from '../styles/media-gallery.module.scss';

const propTypes = {
    items: AppPropTypes.medias,
    isPicker: PropTypes.bool,
    isSmall: PropTypes.bool,
    className: PropTypes.string,
    onClickMedia: PropTypes.func,
};

const defaultProps = {
    items: null,
    isPicker: false,
    isSmall: false,
    className: null,
    onClickMedia: null,
};

const MediaGallery = ({ items: initialItems, isPicker,isSmall, className, onClickMedia }) => {
    // Filters
    const [filtersValue, setFiltersValue] = useState(null);

    // Items
    const { allMedias: loadedMedias } = useMedias(filtersValue, 1, 100, {
        items: initialItems,
    });
    const [addedMedias, setAddedMedias] = useState([]);
    const medias = useMemo(() => {
        const allMedias = [...addedMedias, ...(loadedMedias || [])];
        return allMedias.length > 0 ? allMedias : null;
    }, [loadedMedias, addedMedias]);

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
    const createMedia = useCreateMedia();
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);
    const onUploadCompleted = useCallback(
        newMedias => {
            Promise.all(newMedias.map(createMedia)).then(newAddedMedias =>
                setAddedMedias([...addedMedias, ...newAddedMedias]),
            );
        },
        [createMedia, addedMedias, setAddedMedias],
    );
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
                    {medias !== null ? (
                        <Gallery
                            items={medias}
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
