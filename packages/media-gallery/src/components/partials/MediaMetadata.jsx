/* eslint-disable jsx-a11y/media-has-caption */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { useFieldComponent } from '@micromag/core/contexts';
import { useMediaUpdate } from '@micromag/data'; // useOrganisationTeam
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import prettyBytes from 'pretty-bytes';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from '../../styles/partials/media-metadata.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
    tags: MicromagPropTypes.tags,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    tags: [],
    className: null,
};

function MediaMetadata({ media, tags: allTags, className }) {
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

    const onSave = useCallback(
        () =>
            update(mediaId, { name, tags, description }).then(() => {
                setChanged(false);
            }),
        [mediaId, name, tags, description, metadata, update],
    );

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
                {type !== 'video' ? (
                    <img src={thumbnail} className={styles.image} alt={filename} />
                ) : null}
            </div>
            <div className="p-2">
                <div className="tags mb-4">
                    <div className="form-group">
                        <h6>
                            <FormattedMessage
                                defaultMessage="Name"
                                description="Name in Media Gallery"
                            />
                        </h6>
                        <TextField value={name} onChange={onNameChange} />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
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
                                <div className="col-4 text-muted">
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
                                <div className="col-4 text-muted">
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
                                <div className="col-4 text-muted">
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
                                <div className="col-4 text-muted">
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
                                <div className="col-4 text-muted">
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
                                <div className="col-4 text-muted">
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
                                <div className="col-4 text-muted">
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
            </div>
        </div>
    );
}

MediaMetadata.propTypes = propTypes;

MediaMetadata.defaultProps = defaultProps;

export default MediaMetadata;
