import classNames from 'classnames';
import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

import { MediasApi, MediasBrowserContainer, MediasPickerContainer } from '@panneau/medias';

import type { Media } from '@micromag/core';
import { useStory } from '@micromag/core/contexts';
import { useApi, useMediaCreate } from '@micromag/data';

import defaultColumns from './columns';
import { useDefaultFields, useDefaultFilters } from './defaults';

import styles from '../styles/new-media-gallery.module.css';

export interface MediaGalleryProps {
    value?: Media | Media[] | null;
    types?: string | string[] | null;
    source?: string;
    filters?: { id?: string }[] | null;
    fields?: { id?: string }[] | null;
    columns?: { id?: string }[];
    isPicker?: boolean;
    multiple?: boolean;
    medias?: Media[] | null;
    query?: Record<string, unknown> | null;
    onChange?: ((media: Media | Media[] | null) => void) | null;
    onMediaFormOpen?: ((...args: unknown[]) => void) | null;
    onMediaFormClose?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function MediaGallery({
    value = null,
    types = null,
    source = null,
    filters: providedFilters = null,
    fields: providedFields = null,
    columns = defaultColumns,
    isPicker = false,
    multiple = false,
    medias: initialMedias = null,
    query = null,
    onChange = null,
    onMediaFormOpen = null,
    onMediaFormClose = null,
    className = null,
}: MediaGalleryProps) {
    const api = useApi();
    const story = useStory();
    const { id: storyId = null } = story || {};

    const finalTypes = isString(types) ? [types] : types;
    const fileTypes = [
        ...(finalTypes || []).map((t) =>
            ['image', 'video', 'audio'].indexOf(t) !== -1 ? `${t}/*` : null,
        ),
        (finalTypes || []).indexOf('video') !== -1 ? 'image/gif' : null,
    ].filter((t) => t !== null);

    const defaultFields = useDefaultFields();
    const defaultFilters = useDefaultFilters();
    const fields = providedFields ?? defaultFields;
    const filters = (providedFilters ?? defaultFilters)
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
        .filter((f) => f !== null);

    const mediasApi: MediasApi = {
        get: (...args) => api.medias.get(...args),
        getTrashed: (...args) => api.medias.getTrashed(...args),
        find: (...args) => api.medias.find(...args),
        create: (...args) => api.medias.create(...args),
        update: (...args) => api.medias.update(...args),
        delete: (...args) =>
            typeof api.medias.forceDelete !== 'undefined'
                ? api.medias.forceDelete(...args)
                : api.medias.delete(...args),
        trash: (...args) => api.medias.delete(...args),
        restore: (...args) => api.medias.restore(...args),
    };

    // Upload
    const { create: createMedia } = useMediaCreate();
    const onMediaUploaded = (newMedias) =>
        Promise.all(newMedias.map(createMedia)).then((newAddedMedias) => newAddedMedias);

    const uppyConfig = {
        // set sources ? - uppy sources -
        allowedFileTypes: fileTypes !== null && fileTypes.length > 0 ? fileTypes : null,
    };

    const finalQuery = {
        ...query,
        ...(source !== null ? { source } : null),
    };

    const pickerValue = isObject(value) ? [value] : value;
    const onPickerChange = (newValue) => {
        if (onChange !== null) {
            onChange(!multiple && isArray(newValue) ? (newValue?.[0] ?? null) : newValue);
        }
    };

    return (
        <div className={classNames([styles.container, className])}>
            {isPicker ? (
                <MediasPickerContainer
                    className={styles.browser}
                    api={mediasApi}
                    value={pickerValue}
                    types={finalTypes}
                    query={finalQuery}
                    items={initialMedias}
                    filters={filters}
                    fields={fields}
                    columns={columns}
                    multiple={multiple}
                    onChange={onPickerChange}
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
                    types={finalTypes}
                    query={finalQuery}
                    items={initialMedias}
                    filters={filters}
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
