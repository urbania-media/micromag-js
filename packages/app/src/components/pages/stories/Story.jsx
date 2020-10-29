/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { Screens } from '@micromag/editor';
import { ScreensProvider } from '@micromag/screens';
import { useStory } from '@micromag/data';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryBox from '../../partials/StoryBox';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryPage = ({ className }) => {
    const { story: storyId } = useParams();
    const url = useUrlGenerator();
    const { story } = useStory(storyId);
    const { components: screens = null } = story || {};
    return (
        <MainLayout>
            <Page
                section={<FormattedMessage defaultMessage="Story" description="Story page title" />}
                title={story !== null ? story.title : null}
                sidebar={story !== null ? <StoryBox story={story} /> : <div />}
                className={className}
            >
                {screens !== null && screens.length > 0 ? (
                    <ScreensProvider>
                        <Screens
                            items={screens.map((it) => ({
                                ...it,
                                href: url('stories.editor', {
                                    story: story.id,
                                }),
                            }))}
                            withPreview
                        />
                    </ScreensProvider>
                ) : (
                    <div className="jumbotron text-center bg-dark text-light">
                        <h1 className="display-4">
                            <FormattedMessage
                                defaultMessage="No screen yet"
                                description="No screen yet status"
                            />
                        </h1>
                        <p className="lead mt-4 mb-4">
                            <FormattedMessage
                                defaultMessage="It’s time to start creating!"
                                description="Time to create status"
                            />
                        </p>
                        <p className="lead pt-4">
                            {story !== null ? (
                                <Button
                                    href={url('stories.editor', {
                                        story: story.id,
                                    })}
                                    theme="primary"
                                    size="lg"
                                >
                                    <FormattedMessage
                                        defaultMessage="Create your first screen"
                                        description="Create first screen button label"
                                    />
                                </Button>
                            ) : null}
                        </p>
                    </div>
                )}
            </Page>
        </MainLayout>
    );
};

StoryPage.propTypes = propTypes;
StoryPage.defaultProps = defaultProps;

export default StoryPage;
