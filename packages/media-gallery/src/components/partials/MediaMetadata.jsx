/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import { FormattedMessage } from 'react-intl';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMediaTags, useMediaUpdate } from '@micromag/data'; // useOrganisationTeam
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
    const { id, type, thumbnail_url: thumbnail = null, name: initialName, src, metadata = {} } =
        media || {};
    const {
        filename = null,
        size = null,
        width = null,
        height = null,
        duration = null,
        user = null,
        tags: initialTags = [],
    } = metadata || {};

    const fieldsManager = useFieldsManager();
    const { tags: tagOptions } = useMediaTags();
    const { update } = useMediaUpdate();

    const getTagsFromOptions = (tags) => {
        return tags !== null
            ? tags
                  .map((tagValue) => tagOptions.find((o) => o.value === tagValue) || null)
                  .filter((o) => o !== null)
            : [];
    };

    const [name, setName] = useState(initialName);
    const [tags, setTags] = useState(getTagsFromOptions(initialTags));
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

    const onSave = useCallback(() => {
        const allTags = tags !== null ? tags.map((t) => t.value) : [];
        // TODO: refresh upstream data
        update(id, { name, metadata: { ...metadata, tags: allTags } }).then(() => {
            setChanged(false);
        });
    }, [id, name, tags, metadata, update]);

    useEffect(() => {
        setChanged(false);
    }, [media]);

    useEffect(() => {
        setName(initialName);
    }, [initialName, setName]);

    useEffect(() => {
        if (media) {
            setTags(getTagsFromOptions(initialTags));
        } else {
            setTags([]);
        }
        setChanged(false);
    }, [media, setTags, setChanged]);

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
            <div className={classNames([styles.preview])}>
                {type === 'video' ? (
                    <>
                        <video className={styles.video} controls src={src} />
                    </>
                ) : null}
                {type === 'audio' ? (
                    <>
                        <FontAwesomeIcon className={styles.playIcon} icon={faHeadphonesAlt} />
                        <div className={styles.audio}>
                            <audio className={styles.player} controls src={src} />
                        </div>
                    </>
                ) : null}
                {type !== 'video' ? (
                    <div
                        className={styles.image}
                        style={{
                            backgroundImage: thumbnail !== null ? `url('${thumbnail}')` : null,
                        }}
                    />
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
                        <TokensField value={tags} options={tagOptions} onChange={onTagChange} />
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
