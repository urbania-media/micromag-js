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
    onChange: PropTypes.func,
    onMediaFormOpen: PropTypes.func,
    onMediaFormClose: PropTypes.func,
    className: PropTypes.string,
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
    onChange: null,
    onMediaFormOpen: null,
    onMediaFormClose: null,
    className: null,
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
    onChange,
    onMediaFormOpen,
    onMediaFormClose,
    className,
}) {
    const api = useApi();
    const story = useStory();
    const { id: storyId = null } = story || {};

    const mediasApi = useMemo(
        () => ({
            get: (...args) => api.medias.get(...args),
            getTrashed: (...args) => api.medias.getTrashed(...args),
            find: (...args) => api.medias.find(...args),
            create: (...args) => api.medias.create(...args),
            update: (...args) => api.medias.update(...args),
            delete: (...args) =>
                typeof api.medias.forceDelete !== 'undefined'
                    ? api.medias.forceDelete(...args)
                    : api.medias.delete(...args),
            // TODO: Temporary compat... see how this works
            trash: (...args) => api.medias.delete(...args),
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

    // Filters
    const partialFilters = filters || defaultFilters() || [];
    const finalFilters = useMemo(
        () =>
            partialFilters
                .map((filter) => {
                    const { id = null, options = [] } = filter || {};
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

    const [query, setQuery] = useState(source !== null ? { source } : null);
    const finalQuery = useMemo(() => {
        setQuery({ ...(query || null), ...(source !== null ? { source } : null) });
    }, [source, setQuery]);

    const finalTypes = useMemo(
        () => (!isArray(types) && types !== null ? [types] : types),
        [types],
    );

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
                    withStickySelection
                    withTrash
                />
            )}
        </div>
    );
}

MediaGallery.propTypes = propTypes;
MediaGallery.defaultProps = defaultProps;

export default MediaGallery;
