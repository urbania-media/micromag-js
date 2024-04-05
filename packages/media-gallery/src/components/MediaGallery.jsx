import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { UploadModal } from '@micromag/core/components';
import { useApi, useMediaAuthors, useMediaCreate, useMediaTags } from '@micromag/data';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import DisplaysProvider from '@panneau/displays';
import FieldsProvider from '@panneau/fields';
import FiltersProvider from '@panneau/filters';
import { MediasBrowserContainer, MediasPickerContainer } from '@panneau/medias';

// import list from '../_stories/list.json';
import styles from '../styles/media.module.scss';

const videoTypes = ['video', 'image/gif'];

const propTypes = {
    value: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    source: PropTypes.string,
    isPicker: PropTypes.bool,
    multiple: PropTypes.bool,
    withoutTitle: PropTypes.bool,
    withoutSource: PropTypes.bool,
    withoutType: PropTypes.bool,
    medias: MicromagPropTypes.medias,
    selectedMedia: MicromagPropTypes.media,
    className: PropTypes.string,
    navbarClassName: PropTypes.string,
    onChange: PropTypes.func,
    onClickMedia: PropTypes.func,
    onClearMedia: PropTypes.func,
};

const defaultProps = {
    value: null,
    type: null,
    source: 'all',
    isPicker: false,
    multiple: false,
    withoutTitle: false,
    withoutSource: false,
    withoutType: true,
    medias: null,
    selectedMedia: null,
    className: null,
    navbarClassName: null,
    onChange: null,
    onClickMedia: null,
    onClearMedia: null,
};

function MediaGallery({
    value: initialValue,
    type,
    source,
    isPicker,
    multiple,
    withoutTitle,
    withoutSource,
    withoutType,
    medias: initialMedias,
    selectedMedia,
    className,
    navbarClassName,
    onChange,
    onClickMedia,
    onClearMedia,
}) {
    const api = useApi();
    const mediasApi = useMemo(
        () => ({
            get: (...args) =>
                api.medias.get(...args).then((response) => {
                    const { meta = null, pagination = null, data = null } = response || {};
                    const finalMeta = meta !== null ? { ...meta, page: meta?.current_page } : null;
                    return {
                        data,
                        pagination: pagination || finalMeta,
                    };
                }),
            find: (...args) => api.medias.find(...args),
            create: (...args) => api.medias.create(...args),
            update: (...args) => api.medias.update(...args),
            delete: (...args) => api.medias.delete(...args),
        }),
        [api],
    );

    const { tags } = useMediaTags();
    const { authors } = useMediaAuthors();

    // const throttle = useRef(null);
    // const onFiltersChange = useCallback(
    //     (value) => {
    //         if (throttle.current !== null) {
    //             clearTimeout(throttle.current);
    //         }
    //         throttle.current = setTimeout(() => {
    //             setQueryValue(value);
    //             throttle.current = null;
    //         }, 500);
    //         setFiltersValue(value);
    //     },
    //     [setFiltersValue, setQueryValue, throttle],
    // );

    // Medias
    const onMetadataChange = useCallback(
        (val) => {
            console.log('do something');
        },
        [selectedMedia, onChange],
    );

    // Upload modal
    const [uploading, setUploading] = useState(false);
    const [uploadModalOpened, setUploadModalOpened] = useState(false);
    const { create: createMedia } = useMediaCreate();
    const onClickAdd = useCallback(() => setUploadModalOpened(true), [setUploadModalOpened]);
    const onUploadCompleted = useCallback(
        (newMedias) => {
            setUploading(true);
            console.log('do something');
        },
        [createMedia],
    );

    const onUploadRequestClose = useCallback(
        () => setUploadModalOpened(false),
        [setUploadModalOpened],
    );

    const partialValue = initialValue || selectedMedia || null;
    const finalValue = multiple ? partialValue : [partialValue];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <FieldsProvider>
                <DisplaysProvider>
                    <FiltersProvider>
                        {isPicker ? (
                            <MediasPickerContainer
                                api={mediasApi}
                                theme="dark"
                                items={initialMedias}
                                value={finalValue}
                                onChange={onChange}
                            />
                        ) : (
                            <MediasBrowserContainer
                                api={mediasApi}
                                theme="dark"
                                items={initialMedias}
                            />
                        )}
                    </FiltersProvider>
                </DisplaysProvider>
            </FieldsProvider>
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
