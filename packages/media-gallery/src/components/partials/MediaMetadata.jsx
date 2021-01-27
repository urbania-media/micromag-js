/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import uniqBy from 'lodash/uniqBy';
import { FormattedMessage } from 'react-intl';

import { useApi, useMediaTags, useMediaUpdate } from '@micromag/data'; // useOrganisationTeam
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useFieldsManager } from '@micromag/core/contexts';
import { Button } from '@micromag/core/components';

import styles from '../../styles/partials/media-metadata.module.scss';

const propTypes = {
    media: MicromagPropTypes.media,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    className: null,
};

const MediaMetadata = ({ media, className }) => {
    const {
        id: mediaId,
        type,
        thumbnail_url: thumbnail = null,
        name: mediaName,
        src,
        metadata = {},
    } = media || {};
    const {
        filename = null,
        size = null,
        width = null,
        height = null,
        duration = null,
        user = null,
        tags: mediaTags = [],
    } = metadata || {};

    const fieldsManager = useFieldsManager();
    const api = useApi();
    const { tags: usedTags } = useMediaTags();
    const { update } = useMediaUpdate();

    const loadTags = useCallback(
        (input) =>
            api.medias.getTags(
                {
                    search: input,
                },
                5,
            ),
        [api],
    );
    const getOptionLabel = useCallback(({ name }) => name, []);
    const getOptionValue = useCallback(({ name }) => name, []);
    const getNewOptionData = useCallback(
        (inputValue) => ({
            name: inputValue,
        }),
        [],
    );

    const allTags = useMemo(
        () => (usedTags !== null ? uniqBy(mediaTags.concat(usedTags), ({ id }) => id) : mediaTags),
        [mediaTags, usedTags],
    );

    const [name, setName] = useState(mediaName);
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

    const onSave = useCallback(
        () =>
            update(mediaId, { name, tags }).then(() => {
                setChanged(false);
            }),
        [mediaId, name, tags, metadata, update],
    );

    useEffect(() => {
        if (media !== null) {
            setTags(mediaTags);
            setName(mediaName);
        } else {
            setTags([]);
            setName(null);
        }
        setChanged(false);
    }, [media, setTags, setName, setChanged]);

    const TextField = fieldsManager.getComponent('text');
    const TokensField = fieldsManager.getComponent('tokens');

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
                {type === 'video' ? (
                    <>
                        <video className={styles.player} controls src={src} />
                    </>
                ) : null}
                {type === 'audio' ? (
                    <>
                        <div className={styles.audio}>
                            <audio className={styles.player} controls src={src} />
                        </div>
                    </>
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
                        <h6>
                            <FormattedMessage
                                defaultMessage="Tags"
                                description="Tags in Media Gallery"
                            />
                        </h6>
                        <TokensField
                            value={tags}
                            options={allTags}
                            loadOptions={loadTags}
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
                    {user !== null && user.name ? (
                        <li className="list-group-item py-2 px-2">
                            <div className="row">
                                <div className="col-4 text-muted">
                                    <FormattedMessage
                                        defaultMessage="Size"
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
};

MediaMetadata.propTypes = propTypes;

MediaMetadata.defaultProps = defaultProps;

export default MediaMetadata;
