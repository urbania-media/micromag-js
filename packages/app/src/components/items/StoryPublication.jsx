/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label, Button, Link } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import defaultServices from '../../data/publish-services';

const messages = defineMessages({
    settings: {
        id: 'publish_result.details',
        defaultMessage: 'Details',
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
    const service = services.find(it => it.id === item.service) || null;
    const onClickDetails = useCallback(() => setDetailsOpened(!detailsOpened), [
        detailsOpened,
        setDetailsOpened,
    ]);
    return (
        <li
            className={classNames([
                'list-group-item',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="row align-items-center mx-n2">
                <div className="col-auto px-2">
                    <Label>{service !== null ? service.label : item.service}</Label>
                </div>
                {item.url !== null ? (
                    <div className="col px-2">
                        <Link href={item.url} external className="text-muted">{item.url}</Link>
                    </div>
                ) : null}
                <div className="col-auto px-2">
                    <Button
                        theme="secondary"
                        outline
                        size="sm"
                        className={classNames({
                            active: detailsOpened,
                        })}
                        onClick={onClickDetails}
                    >
                        {messages.details}
                    </Button>
                </div>
            </div>
        </li>
    );
};

StoryPublication.propTypes = propTypes;
StoryPublication.defaultProps = defaultProps;

export default StoryPublication;
