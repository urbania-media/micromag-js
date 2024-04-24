import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import { MediasBrowserContainer, MediasPickerContainer } from '@panneau/medias';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useStory } from '@micromag/core/contexts';
import { useApi, useMediaCreate } from '@micromag/data';

import defaultColumns from './columns';
import defaultFields from './fields';
import defaultFilters from './filters';

import styles from '../styles/new-media-gallery.module.scss';

const videoTypes = ['video', 'image/gif'];

const propTypes = {
    value: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    types: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    source: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    fields: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    columns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    isPicker: PropTypes.bool,
    multiple: PropTypes.bool,
    medias: MicromagPropTypes.medias,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    types: null,
    source: 'all',
    filters: null,
    fields: defaultFields,
    columns: defaultColumns,
    isPicker: false,
    multiple: false,
    medias: null,
    className: null,
    onChange: null,
};

function MediaGallery({
    value,
    types,
    source,
    filters,
    fields,
    columns,
    isPicker,
    multiple,
    medias: initialMedias,
    className,
    onChange,
}) {
    const api = useApi();
    const story = useStory();
    const { id: storyId = null } = story || {};

    const mediasApi = useMemo(
        () => ({
            get: (...args) => api.medias.get(...args),
            getTrashed: (...args) => api.medias.get(...args),
            find: (...args) => api.medias.find(...args),
            create: (...args) => api.medias.create(...args),
            update: (...args) => api.medias.update(...args),
            delete: (...args) => api.medias.delete(...args),
            trash: (...args) => api.medias.delete(...args),
        }),
        [api],
    );

    const partialFilters = filters || defaultFilters() || [];

    const { create: createMedia } = useMediaCreate();
    const onUpload = useCallback(
        (newMedias) => {
            console.log('newMedias', newMedias);
            Promise.all(newMedias.map(createMedia)).then((newAddedMedias) => {
                console.log('not uploading anymore', newAddedMedias);
                return newAddedMedias;
            });
        },
        [createMedia],
    );

    const finalFilters = useMemo(
        () =>
            partialFilters
                .map((filter) => {
                    const { id = null } = filter || {};
                    if (id === 'source') {
                        if (storyId === null) {
                            return null;
                        }
                        return { ...filter, value: `document-${storyId}` };
                    }
                    return filter;
                })
                .filter((f) => f !== null),
        [partialFilters, storyId],
    );

    const [query, setQuery] = useState(source !== null ? { source } : null);
    const finalQuery = useMemo(() => {
        setQuery({ ...(query || null), ...(source !== null ? { source } : null) });
    }, [source, setQuery]);

    const finalTypes = useMemo(() => {
        const partialTypes = !isArray(types) ? [types] : types;
        return types === 'video' ? videoTypes : partialTypes;
    }, [types]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            {isPicker ? (
                <MediasPickerContainer
                    className={styles.browser}
                    api={mediasApi}
                    value={value}
                    theme="dark"
                    types={finalTypes}
                    query={finalQuery}
                    multiple={multiple}
                    items={initialMedias}
                    filters={finalFilters}
                    fields={fields}
                    columns={columns}
                    onChange={onChange}
                    onUpload={onUpload}
                    withStickySelection
                />
            ) : (
                <MediasBrowserContainer
                    className={styles.browser}
                    api={mediasApi}
                    value={value}
                    theme="dark"
                    types={finalTypes}
                    query={finalQuery}
                    multiple={multiple}
                    items={initialMedias}
                    filters={finalFilters}
                    fields={fields}
                    columns={columns}
                    onUpload={onUpload}
                    withStickySelection
                />
            )}
        </div>
    );
}

MediaGallery.propTypes = propTypes;
MediaGallery.defaultProps = defaultProps;

export default MediaGallery;
