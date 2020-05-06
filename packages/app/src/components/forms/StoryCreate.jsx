/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStoryCreate } from '@micromag/data';

import formMessages from './messages';

const messages = defineMessages({
    submit: {
        id: 'forms.story.create.submit',
        defaultMessage: 'Create',
    },
});

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onCreated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'title',
            type: 'text',
            label: formMessages.titleLabel,
        },
    ],
    className: null,
    onCreated: null,
};

const StoryCreateForm = ({ fields, className, onCreated }) => {
    const url = useUrlGenerator();
    const { create: createStory } = useStoryCreate();
    const postForm = useCallback((action, data) => createStory(data), [createStory]);
    return (
        <Form
            action={url('stories.create')}
            fields={fields}
            postForm={postForm}
            submitButtonLabel={messages.submit}
            onComplete={onCreated}
            className={className}
        />
    );
};

StoryCreateForm.propTypes = propTypes;
StoryCreateForm.defaultProps = defaultProps;

export default StoryCreateForm;
