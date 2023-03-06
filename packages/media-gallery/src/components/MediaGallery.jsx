import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Spinner, UploadModal } from '@micromag/core/components';
import { useStory } from '@micromag/core/contexts';
import { useMediaAuthors, useMediaCreate, useMedias, useMediaTags } from '@micromag/data';

import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';
import Navbar from './partials/Navbar';

// import list from '../_stories/list.json';
import styles from '../styles/media-gallery.module.scss';

const videoTypes = ['video', 'image/gif'];

const propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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
    onClearMedia: PropTypes.func,
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
    onClearMedia: null,
};

function MediaGallery({
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
    onClearMedia,
}) {
    const intl = useIntl();
    // Base state for filters
    const defaultFilters = {
        type,
        source,
    };

    // Filters
    const throttle = useRef(null);
    const [queryValue, setQueryValue] = useState(defaultFilters);
    const [filtersValue, setFiltersValue] = useState(defaultFilters);

    const story = useStory();
    const { id: storyId = null } = story || {};
    const { tags } = useMediaTags();
    const { authors } = useMediaAuthors();

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

    const [defaultItems, setDefaultItems] = useState(initialMedias);

    // Items
    const {
        items: loadedMedias,
        loading = false,
        loadNextPage = null,
        allLoaded = false,
        reset,
    } = useMedias(queryValue, 1, 30, {
        pages: defaultItems,
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
            const { id: mediaId = null } = media || {};
            const { id: selectedId = null } = selectedMedia || {};
            const different = mediaId !== selectedId;
            if (!isPicker) {
                setMetadataMedia(media);
            } else if (onClickMedia !== null) {
                if (different) {
                    onClickMedia(media);
                }
            }
        },
        [isPicker, setMetadataMedia, onClickMedia, selectedMedia],
    );
    const onClickRemoveItem = useCallback(() => {
        setMetadataMedia(null);
        if (onClickMedia !== null) {
            onClickMedia(null);
        }
    }, [isPicker, setMetadataMedia, onClickMedia]);

    const onClickItemInfo = useCallback((media) => setMetadataMedia(media), [setMetadataMedia]);

    const onMetadataClickClose = useCallback(() => {
        setMetadataMedia(null);
    }, [setMetadataMedia]);

    const onMetadataClickSave = useCallback(() => {
        reset();
    }, [reset]);

    const onMetadataClickDelete = useCallback(
        (mediaId = null) => {
            const { id: selectedId = null } = selectedMedia || {};
            if (mediaId !== null && mediaId === selectedId && onClickMedia !== null) {
                onClickMedia(null);
            }
            setMetadataMedia(null);
            reset();
        },
        [setMetadataMedia, selectedMedia],
    );

    // Navigation
    const onClickBack = useCallback(() => {
        setMetadataMedia(null);
    }, [setMetadataMedia, setDefaultItems, setQueryValue]);

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
    const onUploadRequestClose = useCallback(
        () => setUploadModalOpened(false),
        [setUploadModalOpened],
    );

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
                types={isArray(type) ? type : [type]}
                filters={filtersValue}
                media={metadataMedia !== null ? metadataMedia : null}
                selectedMedia={selectedMedia}
                onFiltersChange={onFiltersChange}
                onClickAdd={onClickAdd}
                onClickItem={onClickItem}
                onClickItemInfo={onClickItemInfo}
                onClickBack={onClickBack}
                onClickClear={onClearMedia}
                withoutTitle={withoutTitle}
                withoutSource={withoutSource}
                withoutType={withoutType}
                storyId={storyId}
                authors={authors}
                tags={tags}
                loading={loading || uploading}
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
                            onClickRemoveItem={onClickRemoveItem}
                        />
                    ) : null}
                    {!allLoaded ? (
                        <div className="w-100 mb-2">
                            {loading || uploading ? <Spinner className={styles.loading} /> : null}
                            <Button
                                className="d-block mx-auto"
                                theme="secondary"
                                outline
                                onClick={loadNextPage}
                            >
                                {intl.formatMessage({
                                    defaultMessage: 'Load more',
                                    description: 'Load button label in Media Gallery',
                                })}
                            </Button>
                        </div>
                    ) : null}
                </div>
                <div className={styles.mediaMetadata}>
                    <MediaMetadata
                        media={metadataMedia}
                        tags={tags}
                        onClickClose={onMetadataClickClose}
                        onClickSave={onMetadataClickSave}
                        onClickDelete={onMetadataClickDelete}
                    />
                </div>
            </div>
            {createPortal(
                <UploadModal
                    type={type === 'video' ? videoTypes : type}
                    opened={uploadModalOpened}
                    onUploaded={onUploadCompleted}
                    onRequestClose={onUploadRequestClose}
                />,
                document.body,
            )}
        </div>
    );
}

MediaGallery.propTypes = propTypes;
MediaGallery.defaultProps = defaultProps;

export default MediaGallery;
