/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import { defineMessages } from 'react-intl';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Label } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/media-metadata.module.scss';

const messages = defineMessages({
    technicalDetails: {
        id: 'metadata.technical_details',
        defaultMessage: 'Technical details',
    },
    filename: {
        id: 'metadata.filename',
        defaultMessage: 'Filename',
    },
    size: {
        id: 'metadata.size',
        defaultMessage: 'Size',
    },
    duration: {
        id: 'metadata.duration',
        defaultMessage: 'Duration',
    },
    dimension: {
        id: 'metadata.dimension',
        defaultMessage: 'Dimension',
    },
});

const propTypes = {
    media: AppPropTypes.media, // eslint-disable-line react/forbid-prop-types
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    className: null,
};

const MediaMetadata = ({ media, className }) => {
    const {
        type,
        thumbnail_url: thumbnail = null,
        name,
        filename = null,
        size = null,
        metadata: { width = null, height = null, duration = null } = {},
    } = media || {};
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={classNames(['bg-dark', styles.preview])}>
                {type === 'video' ? (
                    <FontAwesomeIcon className={styles.playIcon} icon={faPlayCircle} />
                ) : null}
                <div
                    className={styles.image}
                    style={{
                        backgroundImage: thumbnail !== null ? `url("${thumbnail}")` : null,
                    }}
                />
            </div>

            <div className="p-2">
                <h4 className="mb-4">{name}</h4>

                <h6>
                    <Label>{messages.technicalDetails}</Label>
                </h6>
                <ul className="list-group">
                    {filename !== null ? (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-2 text-muted">
                                    <Label>{messages.filename}</Label>
                                </div>
                                <div className="col">{filename}</div>
                            </div>
                        </li>
                    ) : null}
                    {duration ? (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-2 text-muted">
                                    <Label>{messages.duration}</Label>
                                </div>
                                <div className="col">{duration}</div>
                            </div>
                        </li>
                    ) : null}
                    {width !== null || height !== null ? (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-2 text-muted">
                                    <Label>{messages.dimension}</Label>
                                </div>
                                <div className="col">
                                    {width}x{height}
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {size !== null ? (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-2 text-muted">
                                    <Label>{messages.size}</Label>
                                </div>
                                <div className="col">{prettyBytes(size)}</div>
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
