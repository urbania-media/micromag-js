/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { useStoryPublicationCreate } from '@micromag/data';

import * as AppPropTypes from '../../lib/PropTypes';
import PublicationServices from '../lists/PublicationServices';
import defaultServices from '../../data/publish-services';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    services: AppPropTypes.publicationServices,
    className: PropTypes.string,
    onPublished: PropTypes.func,
};

const defaultProps = {
    services: defaultServices,
    className: null,
    onPublished: null,
};

const StoryPublishForm = ({ story, services, className, onPublished }) => {
    const [publicationValue, setPublicationValue] = useState(null);
    const { create: createPublication } = useStoryPublicationCreate(story.id);
    const onClickPublish = useCallback(() => {
        Promise.all(
            Object.keys(publicationValue)
                .filter((id) =>
                    isObject(publicationValue[id])
                        ? publicationValue[id].enabled || false
                        : publicationValue[id] || false,
                )
                .map((id) => {
                    const value = publicationValue[id];
                    const settings = isObject(value) ? value.settings || null : null;
                    return createPublication(id, settings);
                }),
        ).then((publications) => {
            console.log(publications);
        });
    }, [createPublication, onPublished, publicationValue]);

    const hasServiceEnabled =
        publicationValue !== null &&
        Object.keys(publicationValue).reduce(
            (oneEnabled, serviceId) =>
                oneEnabled ||
                (isObject(publicationValue[serviceId])
                    ? publicationValue[serviceId].enabled || false
                    : publicationValue[serviceId] || false),
            false,
        );
    return (
        <form className={className}>
            <PublicationServices
                items={services}
                value={publicationValue}
                onChange={setPublicationValue}
            />
            <div className="d-flex mt-4 align-items-center justify-content-end">
                <Button
                    theme="primary"
                    size="lg"
                    disabled={!hasServiceEnabled}
                    onClick={onClickPublish}
                >
                    <FormattedMessage defaultMessage="Publish" description="Button label" />
                </Button>
            </div>
        </form>
    );
};

StoryPublishForm.propTypes = propTypes;
StoryPublishForm.defaultProps = defaultProps;

export default StoryPublishForm;
