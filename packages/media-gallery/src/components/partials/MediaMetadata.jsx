/* eslint-disable jsx-a11y/media-has-caption */
// useOrganisationTeam
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import prettyBytes from 'pretty-bytes';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { useFieldComponent } from '@micromag/core/contexts';
import { useMediaUpdate, useMediaDelete, useMediaRequestDelete } from '@micromag/data';

import styles from '../../styles/partials/media-metadata.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
    tags: MicromagPropTypes.tags,
    onChange: PropTypes.func,
    onClickClose: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickDelete: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    tags: [],
    onChange: null,
    onClickClose: null,
    onClickSave: null,
    onClickDelete: null,
    className: null,
};

function MediaMetadata({
    media,
    tags: allTags,
    onChange,
    onClickClose,
    onClickSave,
    onClickDelete,
    className,
}) {
    const {
        id: mediaId,
        type,
        url = null,
        thumbnail_url: thumbnail = null,
        name: mediaName = null,
        metadata = {},
    } = media || {};

    const {
        filename = null,
        size = null,
        width = null,
        height = null,
        duration = null,
        user = null,
        description: mediaDescription = null,
        tags: mediaTags = [],
    } = metadata || {};

    const { update } = useMediaUpdate();
    const { requestDeleteMedia } = useMediaRequestDelete();
    const { deleteMedia } = useMediaDelete();

    const getOptionLabel = useCallback(({ name }) => name, []);
    const getOptionValue = useCallback(({ name }) => name, []);
    const getNewOptionData = useCallback(
        (inputValue) => ({
            name: inputValue,
        }),
        [],
    );

    const finalTags = useMemo(
        () => (allTags !== null ? uniqBy(mediaTags.concat(allTags), ({ id }) => id) : mediaTags),
        [mediaTags, allTags],
    );

    const [name, setName] = useState(mediaName);
    const [description, setDescription] = useState(mediaDescription);
    const [tags, setTags] = useState(mediaTags.map(getOptionValue));
    const [changed, setChanged] = useState(false);

    const onTagChange = useCallback(
        (val) => {
            setTags(val);
            setChanged(true);
        },
        [tags, setTags, setChanged],
    );

    const onNameChange = useCallback(
        (val) => {
            setName(val);
            setChanged(true);
        },
        [tags, setName, setChanged],
    );

    const onDescriptionChange = useCallback(
        (val) => {
            setDescription(val);
            setChanged(true);
        },
        [tags, setDescription, setChanged],
    );

    const [saveState, setSaveState] = useState(null);
    const onSave = useCallback(
        () =>
            update(mediaId, { name, tags, description })
                .then((response) => {
                    setChanged(false);
                    setSaveState(null);
                    if (onClickSave !== null) {
                        onClickSave();
                    }
                    if (onChange !== null) {
                        onChange(response);
                    }
                })
                .catch(() => {
                    setSaveState(false);
                }),
        [
            mediaId,
            name,
            tags,
            description,
            metadata,
            update,
            onChange,
            onClickSave,
            onClickClose,
            setChanged,
            setSaveState,
        ],
    );

    const [deletedState, setDeletedState] = useState(null);
    const [confirmation, setConfirmation] = useState(null);

    useEffect(() => {
        setDeletedState(null);
        setConfirmation(null);
    }, [mediaId, setDeletedState, setConfirmation]);

    const onConfirm = useCallback(() => {
        requestDeleteMedia(mediaId)
            .then((response) => {
                const { state, items = [] } = response || {};
                if (state === 'needs_confirmation') {
                    setConfirmation(items || []);
                } else {
                    setConfirmation(null);
                }
            })
            .catch(() => {
                setConfirmation(null);
            });
    }, [mediaId, requestDeleteMedia, setConfirmation]);

    const onDelete = useCallback(() => {
        deleteMedia(mediaId)
            .then(() => {
                setChanged(false);
                setDeletedState(true);
                setConfirmation(null);
                if (onClickDelete !== null) {
                    onClickDelete(mediaId);
                }
            })
            .catch(() => {
                setDeletedState(false);
                setConfirmation(null);
            });
    }, [mediaId, deleteMedia, onClickDelete, setChanged, setDeletedState, setConfirmation]);

    const onCancelDelete = useCallback(() => {
        setConfirmation(null);
        setDeletedState(null);
    }, [setConfirmation, setDeletedState]);

    useEffect(() => {
        if (media !== null) {
            setTags(mediaTags);
            setName(mediaName);
            setDescription(mediaDescription);
        } else {
            setTags([]);
            setName(null);
            setDescription(null);
        }
        setChanged(false);
    }, [media, setTags, setName, setDescription, setChanged]);

    const TextField = useFieldComponent('text');
    const TokensField = useFieldComponent('tokens');

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div
                className={classNames([
                    'position-relative',
                    {
                        'bg-light': type === 'audio',
                        'bg-black': type === 'image',
                        [styles.video]: type === 'video',
                    },
                ])}
            >
                {type === 'video' ? <video className={styles.player} controls src={url} /> : null}
                {type === 'audio' ? (
                    <div className={styles.audio}>
                        <audio className={styles.player} controls src={url} />
                    </div>
                ) : null}
                {type !== 'video' && thumbnail !== null ? (
                    <img src={thumbnail} className={styles.image} alt={filename} />
                ) : (
                    <div className={styles.placeholder} />
                )}
            </div>
            <div className="p-2">
                <div className="tags mb-4">
                    <div className="my-3">
                        <h6>
                            <FormattedMessage
                                defaultMessage="Name"
                                description="Name in Media Gallery"
                            />
                        </h6>
                        <TextField value={name} onChange={onNameChange} />
                    </div>
                    <div className="my-3">
                        <h6 className="mb-0">
                            <FormattedMessage
                                defaultMessage="Description"
                                description="Description in Media Gallery"
                            />
                        </h6>
                        <p className="mb-1">
                            <small>
                                <FormattedMessage
                                    defaultMessage="Alternative text (accessibility)"
                                    description="Media Gallery"
                                />
                            </small>
                        </p>
                        <TextField value={description} onChange={onDescriptionChange} />
                    </div>
                    <div className="my-3">
                        <h6>
                            <FormattedMessage
                                defaultMessage="Tags"
                                description="Tags in Media Gallery"
                            />
                        </h6>
                        <TokensField
                            value={tags}
                            options={finalTags}
                            // loadOptions={loadTags}
                            getOptionLabel={getOptionLabel}
                            getOptionValue={getOptionValue}
                            getNewOptionData={getNewOptionData}
                            onChange={onTagChange}
                        />
                    </div>
                    {changed ? (
                        <Button theme="primary" onClick={onSave}>
                            <FormattedMessage
                                defaultMessage="Save"
                                description="Save in Media Gallery"
                            />
                        </Button>
                    ) : null}
                    {saveState === false ? (
                        <p className="pt-1 text-danger">
                            <FormattedMessage
                                defaultMessage="Sorry, this media could not be saved."
                                description="Save error message in Media Gallery"
                            />
                        </p>
                    ) : null}
                </div>
                <h6>
                    <FormattedMessage
                        defaultMessage="Technical details"
                        description="Heading in Media Gallery"
                    />
                </h6>
                <ul className="list-group">
                    {type !== null ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Type"
                                        description="Type Label in Media Gallery"
                                    />
                                </div>
                                <div className="col text-capitalize">
                                    <small>{type}</small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {filename !== null ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Filename"
                                        description="Label in Media Gallery"
                                    />
                                </div>
                                <div className="col">
                                    <small>{filename}</small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {duration ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Duration"
                                        description="Label in Media Gallery"
                                    />
                                </div>
                                <div className="col">
                                    <small>{duration}</small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {width !== null || height !== null ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Dimension"
                                        description="Label in Media Gallery"
                                    />
                                </div>
                                <div className="col">
                                    <small>
                                        {width}x{height}
                                    </small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {size !== null ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Size"
                                        description="Label in Media Gallery"
                                    />
                                </div>
                                <div className="col">
                                    <small>{prettyBytes(size)}</small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {description !== null ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Description"
                                        description="Label in Media Gallery"
                                    />
                                </div>
                                <div className="col">
                                    <small>{description}</small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {user !== null && user.name ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-body-secondary">
                                    <FormattedMessage
                                        defaultMessage="Author"
                                        description="Label in Media Gallery"
                                    />
                                </div>
                                <div className="col">
                                    <small>{user.name}</small>
                                </div>
                            </div>
                        </li>
                    ) : null}
                </ul>
                <div className="py-3">
                    {confirmation !== null ? (
                        <>
                            {confirmation.length > 0 ? (
                                <>
                                    <p className="pt-1 text-danger">
                                        <FormattedMessage
                                            defaultMessage="This media is used by the following documents: "
                                            description="Delete error message in Media Gallery"
                                        />
                                    </p>
                                    <ul>
                                        {confirmation.map((it, i) => (
                                            <li key={`${it}-${i + 1}`} className="text-danger">
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : null}
                            <p className="pt-1 text-danger">
                                <FormattedMessage
                                    defaultMessage="Are you sure you want to continue?"
                                    description="Delete error message in Media Gallery"
                                />
                            </p>
                        </>
                    ) : null}
                    <div className="d-flex">
                        <Button
                            className="me-2"
                            theme="danger"
                            outline
                            onClick={confirmation === null ? onConfirm : onDelete}
                        >
                            <FormattedMessage
                                defaultMessage="Delete media"
                                description="Delete in Media Gallery"
                            />
                        </Button>
                        {confirmation !== null ? (
                            <Button theme="primary" outline onClick={onCancelDelete}>
                                <FormattedMessage
                                    defaultMessage="Cancel"
                                    description="Delete in Media Gallery"
                                />
                            </Button>
                        ) : null}
                    </div>
                    {deletedState === false ? (
                        <p className="pt-1 text-danger">
                            <FormattedMessage
                                defaultMessage="Sorry, this media could not be deleted."
                                description="Delete error message in Media Gallery"
                            />
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

MediaMetadata.propTypes = propTypes;
MediaMetadata.defaultProps = defaultProps;

export default MediaMetadata;
