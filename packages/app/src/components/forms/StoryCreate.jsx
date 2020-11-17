/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStoryCreate } from '@micromag/data';

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
            label: <FormattedMessage defaultMessage="Title" description="Title field label" />,
        },
    ],
    onCreated: null,
    className: null,
};

const StoryCreateForm = ({ fields, onCreated, className }) => {
    const url = useUrlGenerator();
    const { create: createStory } = useStoryCreate();
    const postForm = useCallback((action, data) => createStory(data), [createStory]);

    return (
        <Form
            action={url('stories.create')}
            fields={fields}
            postForm={postForm}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Create" description="Button label" />
            }
            onComplete={onCreated}
            className={className}
        />
    );
};

StoryCreateForm.propTypes = propTypes;
StoryCreateForm.defaultProps = defaultProps;

export default StoryCreateForm;
