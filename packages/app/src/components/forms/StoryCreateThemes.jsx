/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useStoryCreate, useOrganisationThemes } from '@micromag/data';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    organisation: AppPropTypes.organisation,
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    withoutTheme: PropTypes.bool,
    onCreated: PropTypes.func,
};

const defaultProps = {
    organisation: null,
    fields: [
        {
            name: 'title',
            type: 'text',
            label: <FormattedMessage defaultMessage="Title" description="Title field label" />,
        },
    ],
    onCreated: null,
    withoutTheme: false,
    className: null,
};

const StoryCreateForm = ({ organisation, fields, onCreated, withoutTheme, className }) => {
    const url = useUrlGenerator();
    const id = organisation !== null ? organisation.id : null;
    const { themes } = useOrganisationThemes(id);

    const { create: createStory } = useStoryCreate();
    const postForm = useCallback((action, data) => createStory(data), [createStory]);

    const hasThemes = organisation !== null && themes !== null;

    const finalFields =
        hasThemes && !withoutTheme
            ? fields.concat([
                  {
                      name: 'theme',
                      type: 'select',
                      label: (
                          <FormattedMessage
                              defaultMessage="Theme"
                              description="Theme field label"
                          />
                      ),
                      options: themes.map((t) => ({ label: t.title, value: t.id })),
                  },
              ])
            : fields;

    return (
        <Form
            action={url('stories.create')}
            fields={finalFields}
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
