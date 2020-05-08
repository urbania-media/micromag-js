/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label, Button, Link, Date } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import defaultServices from '../../data/publish-services';

const messages = defineMessages({
    details: {
        id: 'story_publication.details',
        defaultMessage: 'Details',
    },
    publishedAt: {
        id: 'story_publication.published_at',
        defaultMessage: 'Published at',
    },
});

const propTypes = {
    item: AppPropTypes.storyPublication.isRequired,
    services: AppPropTypes.publicationServices,
    className: PropTypes.string,
};

const defaultProps = {
    services: defaultServices,
    className: null,
};

const StoryPublication = ({ item, services, className }) => {
    const [detailsOpened, setDetailsOpened] = useState(false);
    const { service: serviceId, url, published_at: publishedAt = null } = item;
    const service = services.find(it => it.id === serviceId) || null;
    const onClickDetails = useCallback(() => setDetailsOpened(!detailsOpened), [
        detailsOpened,
        setDetailsOpened,
    ]);
    return (
        <li
            className={classNames([
                'list-group-item',
                'px-3',
                'py-2',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="row align-items-center mx-n2">
                <div className="col-auto px-2 mr-auto">
                    <Label>{service !== null ? service.label : serviceId}</Label>
                </div>
                {item.url !== null ? (
                    <div className="col px-2 mr-auto text-muted">
                        <Link href={url} external className="text-reset">
                            <small>{url}</small>
                        </Link>
                    </div>
                ) : null}
                <div className="col-auto px-2 text-muted">
                    {publishedAt !== null ? (
                        <small className="">
                            <Date date={publishedAt} />
                        </small>
                    ) : null}
                </div>
                <div className="col-auto px-2">
                    <Button size="sm" className="text-dark" onClick={onClickDetails}>
                        <FontAwesomeIcon icon={detailsOpened ? faCaretDown : faCaretLeft} />
                    </Button>
                </div>
            </div>
            <div
                className={classNames([
                    {
                        'd-none': !detailsOpened,
                    },
                ])}
            >
                <ul className="list-group list-group-flush">
                    {publishedAt !== null ? (
                        <li className="list-group-item px-0 py-2 text-muted small">
                            <div className="row align-items-center mx-n2">
                                <div className="col-3 px-2">
                                    <strong>
                                        <Label>{messages.publishedAt}</Label>
                                    </strong>
                                </div>
                                <div className="col px-2 small">
                                    <Date date={publishedAt} withTime />
                                </div>
                            </div>
                        </li>
                    ) : null}
                    {url !== null ? (
                        <li className="list-group-item px-0 py-2 text-muted small">
                            <div className="row align-items-center mx-n2">
                                <div className="col-3 px-2">
                                    <strong>URL</strong>
                                </div>
                                <div className="col px-2">
                                    <Link href={url} external className="text-reset">
                                        {url}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ) : null}
                </ul>
            </div>
        </li>
    );
};

StoryPublication.propTypes = propTypes;
StoryPublication.defaultProps = defaultProps;

export default StoryPublication;
