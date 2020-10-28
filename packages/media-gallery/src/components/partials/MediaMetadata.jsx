/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import { FormattedMessage } from 'react-intl';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMediaTags, useMediaUpdate } from '@micromag/data'; // useOrganisationTeam
import { Tokens } from '@micromag/fields';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
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
    const { id, type, thumbnail_url: thumbnail = null, name, src, metadata = {} } = media || {};
    const {
        filename = null,
        size = null,
        width = null,
        height = null,
        duration = null,
        user = null,
        tags: initialTags = [],
    } = metadata || {};

    const { tags: tagOptions } = useMediaTags();
    const { update } = useMediaUpdate();

    const getTagsFromOptions = (tags) => {
        return tags !== null
            ? tags
                  .map((tagValue) => tagOptions.find((o) => o.value === tagValue) || null)
                  .filter((o) => o !== null)
            : [];
    };

    const [tags, setTags] = useState(getTagsFromOptions(initialTags));
    const [changed, setChanged] = useState(false);

    const onTagChange = useCallback(
        (data) => {
            setTags(data);
            setChanged(true);
        },
        [tags, setTags, setChanged],
    );

    const onSave = useCallback(() => {
        const all = tags !== null ? tags.map((t) => t.value) : [];
        // TODO: refresh upstream data
        update(id, { metadata: { ...metadata, tags: all } }).then(() => {
            setChanged(false);
        });
    }, [id, tags, metadata, update]);

    useEffect(() => {
        setChanged(false);
    }, [media]);

    useEffect(() => {
        if (media) {
            setTags(getTagsFromOptions(initialTags));
        } else {
            setTags([]);
        }
        setChanged(false);
    }, [media, setTags, setChanged]);

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
                <h4 className="mb-4">{name}</h4>
                <div className="tags mb-4 text-dark">
                    <Tokens value={tags} options={tagOptions} onChange={onTagChange} />
                    {changed ? (
                        <Button onClick={onSave}>
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
