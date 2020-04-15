import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useUrlGenerator } from '@folklore/react-container';
import { useHistory } from 'react-router';

import { Checkboxes } from '@micromag/fields';

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
    items: [
        {
            id: 0,
            type: 'image',
            url:
                'https://urbania.ca/wp-content/themes/new-theme/static/images/chien_noir_thN@4x.png',
            filename: 'uuuuurbaniaDog1.mov',
        },
        {
            id: 1,
            type: 'video',
            url: 'https://i.imgur.com/EVOFpNF.png',
            filename: 'moon.mov',
            tags: { label: 'Logos', value: 'logos' },
            user: 'Martin',
            date: 'December 18, 2019',
            usage: 2,
            format: 'Fichier QuickTime',
            length: '3:32',
            dimensions: '1920 x 1080',
            size: '128,2 Mo',
        },
        {
            id: 2,
            type: 'video',
            url: 'https://i.imgur.com/XqNtIEd.jpg',
            filename: 'sea.mov',
        },
        {
            id: 3,
            type: 'image',
            url:
                'https://urbania.ca/wp-content/themes/new-theme/static/images/chien_noir_thN@4x.png',
            filename: 'urbaniaDog4.jpg',
        },
        {
            id: 4,
            type: 'image',
            url:
                'https://urbania.ca/wp-content/themes/new-theme/static/images/chien_noir_thN@4x.png',
            filename: 'urbaniaDog5.jpg',
        },
    ],
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
    const urlGenerator = useUrlGenerator();
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

    const onClickAdd = () => {
        // @TODO add another file
    };

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
            history.push(`${urlGenerator.route('search')}?q=${encodeURIComponent(searchingQuery)}`);
        },
        [searchQuery],
    );

    const resetSearch = () => {
        setSearchQuery({
            searchQuery: null,
        });
    };

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
            <div className={styles.search}>
                <Search
                    value={searchQuery}
                    onChange={onSearchChange}
                    onSubmit={onSearchSubmit}
                    onFiltersOpened={onSearchFiltersOpened}
                    onClickAdd={onClickAdd}
                    reset={resetSearch}
                />
            </div>

            <Checkboxes
                className={styles.tags}
                options={options}
                value={tagsValue || []}
                noWrap
                spaced
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
        </div>
    );
};

MediaGallery.propTypes = propTypes;
MediaGallery.defaultProps = defaultProps;

export default MediaGallery;
