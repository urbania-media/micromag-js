import classNames from 'classnames';
// import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { QueryProvider } from '@panneau/data';
import DisplaysProvider from '@panneau/displays';
import FieldsProvider from '@panneau/fields';
import FiltersProvider from '@panneau/filters';
import { MediasBrowserContainer, MediasPickerContainer } from '@panneau/medias';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { UploadModal } from '@micromag/core/components';
import { useApi, useMediaCreate } from '@micromag/data';

import defaultFilters from './filters';

// import list from '../_stories/list.json';
import styles from '../styles/new-media-gallery.module.scss';

// const videoTypes = ['video', 'image/gif'];

const propTypes = {
    value: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    types: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    source: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    isPicker: PropTypes.bool,
    multiple: PropTypes.bool,
    medias: MicromagPropTypes.medias,
    buttons: PropTypes.arrayOf(PropTypes.shape({})),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    types: null,
    source: 'all',
    filters: null,
    isPicker: false,
    multiple: false,
    medias: null,
    buttons: null,
    className: null,
    onChange: null,
};

function MediaGallery({
    value,
    types,
    source,
    filters,
    isPicker,
    multiple,
    medias: initialMedias,
    buttons,
    className,
    onChange,
}) {
    const api = useApi();

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

    // Upload modal
    const [addedMedias, setAddedMedias] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);

    const { create: createMedia } = useMediaCreate();

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

    const partialFilters = filters || defaultFilters() || [];

    const finalFilters = useMemo(
        () =>
            partialFilters.map((filter) => {
                const { id = null } = filter || {};
                if (id === 'sources') {
                    return filter;
                }
                // if (id === 'tags' && tags !== null) {
                //     return { ...filter, options: tags };
                // }
                return filter;
            }),
        [partialFilters],
    );

    const [query, setQuery] = useState(source !== null ? { source } : null);
    const finalQuery = useMemo(() => {
        setQuery({ ...(query || null), ...(source !== null ? { source } : null) });
    }, [source, setQuery]);

    // const finalValue = useMemo(() => {
    //     const allMedias = [...addedMedias, ...(value || [])];
    //     return allMedias.length > 0 ? allMedias : null;
    // }, [value, addedMedias]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <QueryProvider>
                <FieldsProvider>
                    <DisplaysProvider>
                        <FiltersProvider>
                            {isPicker ? (
                                <MediasPickerContainer
                                    className={styles.browser}
                                    api={mediasApi}
                                    value={value}
                                    theme="dark"
                                    types={types}
                                    query={finalQuery}
                                    multiple={multiple}
                                    items={initialMedias}
                                    filters={finalFilters}
                                    onChange={onChange}
                                    buttons={buttons}
                                    buttonsClassName="ms-xl-auto"
                                    withStickySelection
                                />
                            ) : (
                                <MediasBrowserContainer
                                    className={styles.browser}
                                    api={mediasApi}
                                    value={value}
                                    theme="dark"
                                    types={types}
                                    query={finalQuery}
                                    multiple={multiple}
                                    items={initialMedias}
                                    filters={finalFilters}
                                    buttons={buttons}
                                    buttonsClassName="ms-xl-auto"
                                    withStickySelection
                                />
                            )}
                        </FiltersProvider>
                    </DisplaysProvider>
                </FieldsProvider>
            </QueryProvider>
            {createPortal(
                <UploadModal
                    types={types}
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
