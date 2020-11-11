/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStoryUpdate } from '@micromag/data';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onCreated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'title',
            type: 'text',
            label: <FormattedMessage defaultMessage="Title" description="Title field label" />,
        },
        {
            name: 'description',
            type: 'text',
            label: (
                <FormattedMessage
                    defaultMessage="Description"
                    description="Description field label"
                />
            ),
        },
        {
            name: 'favicon',
            type: 'image',
            label: <FormattedMessage defaultMessage="Favicon" description="Favicon field label" />,
        },
        {
            name: 'image',
            type: 'image',
            label: (
                <FormattedMessage
                    defaultMessage="Preview image"
                    description="Preview image field label"
                />
            ),
        },
    ],
    className: null,
    onCreated: null,
};

const StorySettingsForm = ({ story, fields, className, onCreated }) => {
    const url = useUrlGenerator();
    const { update: updateStory } = useStoryUpdate(story.id);
    const postForm = useCallback((action, data) => updateStory(data), [updateStory]);

    return (
        <Form
            action={url('stories.update')}
            fields={fields}
            initialValue={story}
            postForm={postForm}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Save" description="Save button label" />
            }
            onComplete={onCreated}
            className={className}
        />
    );
};

StorySettingsForm.propTypes = propTypes;
StorySettingsForm.defaultProps = defaultProps;

export default StorySettingsForm;
