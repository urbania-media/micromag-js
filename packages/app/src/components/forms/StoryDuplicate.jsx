import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStoryDuplicate } from '@micromag/data';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onComplete: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'title',
            type: 'text',
            label: <FormattedMessage defaultMessage="Title" description="Field label" />,
        },
        {
            name: 'members',
            type: 'toggle',
            label: <FormattedMessage defaultMessage="Same team" description="Field label" />,
        },
    ],
    onComplete: null,
    className: null,
};

const StoryDuplicateForm = ({ story, fields, onComplete, className }) => {
    const { id, title, type, members = [] } = story || {};
    const intl = useIntl();
    const url = useUrlGenerator();
    const { duplicate: duplicateStory } = useStoryDuplicate(id);
    const postForm = useCallback((action, data) => duplicateStory(data), [duplicateStory]);

    const finalFields =
        members.length === 0 ? fields.filter((field) => field.name !== 'members') : fields;

    return (
        <Form
            action={url('stories.duplicate', { story: id })}
            fields={finalFields}
            postForm={postForm}
            initialValue={{
                id,
                title: `${title} ${intl.formatMessage({
                    defaultMessage: ' (copy)',
                    description: 'Copy duplicate',
                })}`,
                type,
            }}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Duplicate story" description="Button label" />
            }
            onComplete={onComplete}
            className={className}
        />
    );
};

StoryDuplicateForm.propTypes = propTypes;
StoryDuplicateForm.defaultProps = defaultProps;

export default StoryDuplicateForm;
