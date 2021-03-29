import React, { useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMedias, useMediaCreate } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Spinner, UploadModal } from '@micromag/core/components';

// import * as AppPropTypes from '../lib/PropTypes';

import Navbar from './partials/Navbar';
import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';

// import list from '../_stories/list.json';

import styles from '../styles/media-gallery.module.scss';

const propTypes = {
    type: PropTypes.string,
    source: PropTypes.string,
    isPicker: PropTypes.bool,
    isSmall: PropTypes.bool,
    withoutTitle: PropTypes.bool,
    withoutSource: PropTypes.bool,
    withoutType: PropTypes.bool,
    medias: MicromagPropTypes.medias,
    selectedMedia: MicromagPropTypes.media,
    className: PropTypes.string,
    navbarClassName: PropTypes.string,
    onClickMedia: PropTypes.func,
};

const defaultProps = {
    type: null,
    source: 'all',
    isPicker: false,
    isSmall: false,
    withoutTitle: false,
    withoutSource: false,
    withoutType: true,
    medias: null,
    selectedMedia: null,
    className: null,
    navbarClassName: null,
    onClickMedia: null,
};

const MediaGallery = ({
    type,
    source,
    isPicker,
    isSmall,
    withoutTitle,
    withoutSource,
    withoutType,
    medias: initialMedias,
    selectedMedia,
    className,
    navbarClassName,
    onClickMedia,
}) => {
    // Base state for filters
    const defaultFilters = {
        type,
        source,
    };

    // Filters
    const throttle = useRef(null);
    const [queryValue, setQueryValue] = useState(defaultFilters);
    const [filtersValue, setFiltersValue] = useState(defaultFilters);

    const onFiltersChange = useCallback(
        (value) => {
            if (throttle.current !== null) {
                clearTimeout(throttle.current);
            }
            throttle.current = setTimeout(() => {
                setQueryValue(value);
                throttle.current = null;
            }, 500);
            setFiltersValue(value);
        },
        [setFiltersValue, setQueryValue, throttle],
    );

    // Items
    const { allMedias: loadedMedias, loading = false } = useMedias(queryValue, 1, 100, {
        ...(initialMedias !== null ? { items: initialMedias } : null),
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
    const [uploading, setUploading] = useState(false);
    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const { create: createMedia } = useMediaCreate();
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);
    const onUploadCompleted = useCallback(
        (newMedias) => {
            setUploading(true);
            Promise.all(newMedias.map(createMedia)).then((newAddedMedias) => {
                setUploading(false);
                return setAddedMedias([...addedMedias, ...newAddedMedias]);
            });
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
                onFiltersChange={onFiltersChange}
                onClickAdd={onClickAdd}
                onClickBack={onClickBack}
                onClickCancel={onClickCancel}
                withoutTitle={withoutTitle}
                withoutSource={withoutSource}
                withoutType={withoutType}
                className={navbarClassName}
            />
            <div className={styles.content}>
                <div className={styles.gallery}>
                    {medias !== null && !uploading ? (
                        <Gallery
                            items={medias}
                            selectedItem={selectedMedia}
                            selectedFirst
                            withInfoButton={isPicker}
                            isSmall={isSmall}
                            onClickItem={onClickItem}
                            onClickItemInfo={onClickItemInfo}
                        />
                    ) : null}
                    {loading || uploading ? <Spinner className={styles.loading} /> : null}
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
