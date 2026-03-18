import classNames from 'classnames';
import isArray from 'lodash/isArray';
import React, { useCallback, useMemo } from 'react';

import { MediasBrowserContainer, MediasPickerContainer } from '@panneau/medias';

import type { Media } from '@micromag/core';
import { useStory } from '@micromag/core/contexts';
import { useApi, useMediaCreate } from '@micromag/data';

import defaultColumns from './columns';
import defaultFields from './fields';
import defaultFilters from './filters';

import styles from '../styles/new-media-gallery.module.css';

interface MediaGalleryProps {
    value?: { id?: string | number } | null;
    types?: string | unknown[] | null;
    source?: string;
    filters?: { id?: string }[] | null;
    fields?: { id?: string }[] | null;
    columns?: { id?: string }[];
    isPicker?: boolean;
    multiple?: boolean;
    medias?: Media[] | null;
    onChange?: ((...args: unknown[]) => void) | null;
    onMediaFormOpen?: ((...args: unknown[]) => void) | null;
    onMediaFormClose?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function MediaGallery({
    value = null,
    types = null,
    source = 'all',
    filters = null,
    fields: providedFields = null,
    columns = defaultColumns,
    isPicker = false,
    multiple = false,
    medias: initialMedias = null,
    onChange = null,
    onMediaFormOpen = null,
    onMediaFormClose = null,
    className = null,
}: MediaGalleryProps) {
    const api = useApi();
    const story = useStory();
    const { id: storyId = null } = story || {};
    const fields = providedFields === null ? defaultFields() : providedFields;

    const mediasApi = useMemo(
        () => ({
            get: (...args) => api.medias.get(...args),
            getTrashed: (...args) => api.medias.getTrashed(...args),
            find: (...args) => api.medias.find(...args),
            create: (...args) => api.medias.create(...args),
            update: (...args) => api.medias.update(...args),
            replace: (...args) => api.medias.replace(...args),
            delete: (...args) =>
                typeof api.medias.forceDelete !== 'undefined'
                    ? api.medias.forceDelete(...args)
                    : api.medias.delete(...args),
            // TODO: Temporary compat... see how this works
            trash: (...args) => api.medias.delete(...args),
            restore: (...args) => api.medias.restore(...args),
        }),
        [api],
    );

    // Upload
    const { create: createMedia } = useMediaCreate();
    const onMediaUploaded = useCallback(
        (newMedias) =>
            Promise.all(newMedias.map(createMedia)).then((newAddedMedias) => newAddedMedias),
        [createMedia],
    );

    const fileTypes = useMemo(() => {
        let finalTypes = [];
        if (isArray(types)) {
            finalTypes = types
                .map((t) => (['image', 'video', 'audio'].indexOf(t) !== -1 ? `${t}/*` : null))
                .filter((t) => t !== null);
        }
        finalTypes = ['image', 'video', 'audio'].indexOf(types) !== -1 ? [`${types}/*`] : null;

        if (finalTypes !== null && isArray(finalTypes) && finalTypes.indexOf('video/*') !== -1) {
            finalTypes.push('image/gif');
        }
        return finalTypes;
    }, [types]);

    const uppyConfig = useMemo(
        () => ({
            // set sources ? - uppy sources -
            allowedFileTypes: fileTypes !== null && fileTypes.length > 0 ? fileTypes : null,
        }),
        [fileTypes],
    );

    const finalTypes = useMemo(
        () => (!isArray(types) && types !== null ? [types] : types),
        [types],
    );

    // Filters
    const partialFilters = filters || defaultFilters() || [];
    const finalFilters = useMemo(
        () =>
            partialFilters
                .map((filter) => {
                    const { id = null, options = [] } = filter || {};
                    if (id === 'types' && finalTypes !== null) {
                        return false;
                    }
                    if (id === 'source') {
                        if (storyId === null) {
                            return null;
                        }
                        return {
                            ...filter,
                            options: (options || []).map(
                                ({ value: optionValue = null, label = null } = {}) =>
                                    optionValue === 'document-'
                                        ? { value: `document-${storyId}`, label }
                                        : { value: optionValue, label },
                            ),
                        };
                    }
                    return filter;
                })
                .filter((f) => f !== null),
        [partialFilters, storyId],
    );

    const finalQuery = useMemo(
        () => (source !== null ? { source } : null),
        [source],
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
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
                    items={initialMedias}
                    filters={finalFilters}
                    fields={fields}
                    columns={columns}
                    multiple={multiple}
                    onChange={onChange}
                    uppyConfig={uppyConfig}
                    onMediaUploaded={onMediaUploaded}
                    onMediaFormOpen={onMediaFormOpen}
                    onMediaFormClose={onMediaFormClose}
                    withStickySelection
                    withTrash
                />
            ) : (
                <MediasBrowserContainer
                    className={styles.browser}
                    api={mediasApi}
                    value={value}
                    theme="dark"
                    types={finalTypes}
                    query={finalQuery}
                    items={initialMedias}
                    filters={finalFilters}
                    fields={fields}
                    columns={columns}
                    uppyConfig={uppyConfig}
                    onMediaUploaded={onMediaUploaded}
                    multipleSelection // allow multi-uploads in MediasBrowser
                    withStickySelection
                    withTrash
                    withReplace
                />
            )}
        </div>
    );
}

export default MediaGallery;
