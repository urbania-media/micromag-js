/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Navbar } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import PublishButton from '../buttons/Publish';
import SettingsButton from '../buttons/Settings';
import StoryMenu from '../menus/Story';

const propTypes = {
    story: MicromagPropTypes.story,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    className: null,
};

const StoryNavbar = ({ story, className }) => {
    const url = useUrlGenerator();
    return (
        <Navbar theme="primary" withoutCollapse noWrap className={className}>
            {story !== null ? (
                <>
                    <div className="d-flex flex-column">
                        <span className="font-weight-light">
                            <FormattedMessage
                                defaultMessage="Latest version"
                                description="Latest version button label"
                            />
                        </span>
                        <span className="text">Some version</span>
                    </div>
                    <form className="form-inline ml-auto">
                        <PublishButton
                            href={
                                story !== null
                                    ? url('stories.publish', {
                                          story: story.id,
                                      })
                                    : url('stories')
                            }
                            theme="secondary"
                            className="mr-1"
                        >
                            <FormattedMessage
                                defaultMessage="Publish"
                                description="Publish button label"
                            />
                        </PublishButton>
                        <SettingsButton>
                            <StoryMenu story={story} asList withEditor={false} />
                        </SettingsButton>
                    </form>
                </>
            ) : null}
        </Navbar>
    );
};

StoryNavbar.propTypes = propTypes;
StoryNavbar.defaultProps = defaultProps;

export default StoryNavbar;
