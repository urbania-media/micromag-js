/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import { FormattedMessage } from 'react-intl';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

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
        type,
        thumbnail_url: thumbnail = null,
        name,
        metadata: {
            filename = null,
            size = null,
            width = null,
            height = null,
            duration = null,
        } = {},
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
            <div className={classNames([styles.preview])}>
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
                    <FormattedMessage
                        defaultMessage="Technical details"
                        description="Heading in Media Gallery"
                    />
                </h6>
                <ul className="list-group">
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
                </ul>
            </div>
        </div>
    );
};

MediaMetadata.propTypes = propTypes;
MediaMetadata.defaultProps = defaultProps;

export default MediaMetadata;
