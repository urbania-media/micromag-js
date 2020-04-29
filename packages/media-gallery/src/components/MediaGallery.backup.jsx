import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router';

import { Checkboxes } from '@micromag/fields';

import Navbar from './partials/Navbar';
import UploadModal from './partials/UploadModal';
import Search from './forms/Search';
import Gallery from './lists/Gallery';
import MediaMetadata from './partials/MediaMetadata';

import styles from '../styles/media-gallery.module.scss';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})),
    isPicker: PropTypes.bool,
    onClickMedia: PropTypes.func,
    searchQuery: PropTypes.shape({
        search: PropTypes.string,
        types: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        users: PropTypes.arrayOf(PropTypes.string),
        usage: PropTypes.oneOf(['used', 'unused']),
    }),
    options: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    isPicker: false,
    onClickMedia: null,
    searchQuery: null,
    options: [
        { value: 'logos', label: 'logos' },
        { value: 'backgrounds', label: 'backgrounds' },
        { value: 'motifs', label: 'motifs' },
        { value: 'loops', label: 'loops' },
    ],

    className: null,
};

const MediaGallery = ({
    items: initialItems,
    isPicker,
    onClickMedia: onClick,
    searchQuery: initialSearchQuery,
    options,
    className,
}) => {
    const history = useHistory();

    const [items, setItems] = useState(initialItems);

    const [metadataMedia, setMetadataMedia] = useState(null);

    const onChangeMetadata = useCallback(newValue => {
        const { id } = newValue;
        const index = items.findIndex(it => it.id === id);
        setItems([...items.slice(0, index), newValue, ...items.slice(index + 1)]);
        setMetadataMedia(newValue);
    });

    const onClickItemInfo = useCallback((e, item) => {
        setMetadataMedia(item);
    });

    const onClickMedia = useCallback((e, item) => {
        if (isPicker) {
            if (onClick !== null) onClick(item);
        } else {
            setMetadataMedia(item);
        }
    }, []);

    const [searchFiltersOpened, setSearchFiltersOpened] = useState(false);

    const onSearchFiltersOpened = useCallback(val => setSearchFiltersOpened(val), []);

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

    const tagsValue = searchQuery !== null ? searchQuery.tags || null : null;

    const onSearchChange = useCallback(
        newSearchValue => {
            setSearchQuery(newSearchValue);
        },
        [setSearchQuery],
    );

    const onSearchSubmit = useCallback(
        searchingQuery => {
            history.push(`/search?q=${encodeURIComponent(searchingQuery)}`);
        },
        [searchQuery],
    );

    const resetSearch = () => {
        setSearchQuery({
            searchQuery: null,
        });
    };

    const [filtersValue, setFiltersValue] = useState(null);

    // Upload modal
    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const onClickAdd = useCallback(() => setUploadModalOpened(true), []);
    const onUploadCompleted = useCallback(medias => {
        console.log(medias);
    }, []);
    const onUploadRequestClose = useCallback(() => setUploadModalOpened(false), []);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.filtersOpened]: searchFiltersOpened,
                    [styles.metadataOpen]: metadataMedia !== null,
                    [className]: className,
                },
            ])}
        >
            <Navbar
                filters={filtersValue}
                onFiltersChange={setFiltersValue}
                onClickAdd={onClickAdd}
            />

            <div className={styles.gallery}>
                <Gallery
                    items={items}
                    withInfoButton={isPicker}
                    onClickItem={onClickMedia}
                    onClickItemInfo={onClickItemInfo}
                />
            </div>

            {metadataMedia !== null ? (
                <MediaMetadata
                    className={styles.mediaMetadata}
                    value={metadataMedia}
                    onChange={newValue => onChangeMetadata(newValue)}
                />
            ) : null}

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
