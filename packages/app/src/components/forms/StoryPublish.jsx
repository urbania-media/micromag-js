/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import PublishServices from '../lists/PublishServices';
import defaultServices from '../../data/publish-services';

const messages = defineMessages({
    publish: {
        id: 'forms.story.publish.submit',
        defaultMessage: 'Publish',
    },
});

const propTypes = {
    services: AppPropTypes.publishServices,
    className: PropTypes.string,
    onPublished: PropTypes.func,
};

const defaultProps = {
    services: defaultServices,
    className: null,
    onPublished: null,
};

const StoryPublishForm = ({ services, className }) => {
    const [selectedServices, setSelectedServices] = useState(null);
    const onServiceChange = useCallback(
        ({ id }, value) => {
            setSelectedServices({
                ...selectedServices,
                [id]: value,
            });
        },
        [selectedServices],
    );
    const finalServices = useMemo(
        () =>
            services.map(it => ({
                ...it,
                ...(selectedServices !== null ? selectedServices[it.id] || null : null),
            })),
        [services, selectedServices],
    );
    const hasServiceEnabled = finalServices.reduce(
        (oneEnabled, { enabled = false }) => oneEnabled || enabled,
        false,
    );
    return (
        <form className={className}>
            <PublishServices items={finalServices} onServiceChange={onServiceChange} />
            <div className="d-flex mt-4 align-items-center justify-content-end">
                <Button theme="primary" size="lg" disabled={!hasServiceEnabled}>
                    {messages.publish}
                </Button>
            </div>
        </form>
    );
};

StoryPublishForm.propTypes = propTypes;
StoryPublishForm.defaultProps = defaultProps;

export default StoryPublishForm;
