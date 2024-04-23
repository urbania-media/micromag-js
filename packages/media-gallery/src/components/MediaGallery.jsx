import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage } from 'react-intl';

import { MediasBrowserContainer, MediasPickerContainer } from '@panneau/medias';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { UploadModal } from '@micromag/core/components';
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
    buttons: PropTypes.arrayOf(PropTypes.shape({})),
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
    buttons: null,
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
            console.log('newMedias', newMedias);
            setUploading(true);
            Promise.all(newMedias.map(createMedia)).then((newAddedMedias) => {
                console.log('not uploading anymore', newAddedMedias);
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
            partialFilters
                .map((filter) => {
                    const { id = null } = filter || {};
                    if (id === 'sources') {
                        return filter;
                    }
                    // if (id === 'tags' && tags !== null) {
                    //     return { ...filter, options: tags };
                    // }
                    return filter;
                })
                .concat(),
        [partialFilters],
    );

    const [query, setQuery] = useState(source !== null ? { source } : null);
    const finalQuery = useMemo(() => {
        setQuery({ ...(query || null), ...(source !== null ? { source } : null) });
    }, [source, setQuery]);

    const finalValue = useMemo(() => {
        if (addedMedias === null || addedMedias.length === 0) {
            return value;
        }
        console.log('addedMedias', addedMedias);
        if (!multiple) {
            const [firstMedia = null] = addedMedias || [];
            return firstMedia || null;
        }
        const allMedias = [...addedMedias, ...(isArray(value) ? value || [] : [value])];
        return allMedias.length > 0 ? allMedias : null;
    }, [value, addedMedias, multiple]);

    const finalButtons = useMemo(
        () => [
            {
                id: 'upload',
                theme: 'primary',
                label: <FormattedMessage defaultMessage="Upload" description="Field label" />,
                onClick: onClickAdd,
                disabled: uploading,
            },
        ],
        [onClickAdd, uploading],
    );

    const finalTypes = useMemo(() => {
        const partialTypes = !isArray(types) ? [types] : types;
        return types === 'video' ? videoTypes : partialTypes;
    }, [types]);

    console.log('yesh', uploadModalOpened);

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
                    value={finalValue}
                    theme="dark"
                    types={finalTypes}
                    query={finalQuery}
                    multiple={multiple}
                    items={initialMedias}
                    filters={finalFilters}
                    fields={fields}
                    columns={columns}
                    onChange={onChange}
                    buttons={finalButtons}
                    buttonsClassName="ms-xl-auto"
                    withStickySelection
                />
            ) : (
                <MediasBrowserContainer
                    className={styles.browser}
                    api={mediasApi}
                    value={finalValue}
                    theme="dark"
                    types={finalTypes}
                    query={finalQuery}
                    multiple={multiple}
                    items={initialMedias}
                    filters={finalFilters}
                    fields={fields}
                    columns={columns}
                    buttons={finalButtons}
                    buttonsClassName="ms-xl-auto"
                    withStickySelection
                />
            )}
            {createPortal(
                <UploadModal
                    types={finalTypes}
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
