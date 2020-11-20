import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { useUrlGenerator } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import AddButton from '../buttons/Add';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryScreensMenubar = ({ story, className }) => {
    const url = useUrlGenerator();
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                'justify-content-end',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <AddButton href={url('stories.editor', { story: story ? story.id : null })}>
                <FormattedMessage defaultMessage="New screen" description="Button label" />
            </AddButton>
        </div>
    );
};

StoryScreensMenubar.propTypes = propTypes;
StoryScreensMenubar.defaultProps = defaultProps;

export default StoryScreensMenubar;
