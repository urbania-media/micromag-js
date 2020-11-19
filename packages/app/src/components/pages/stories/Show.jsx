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
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StorySidebar from '../../sidebars/Story';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ShowPage = ({ location: { pathname }, className }) => {
    const { story: storyId } = useParams();
    const url = useUrlGenerator();
    const { story } = useStory(storyId);
    const { components: screens = null } = story || {};

    const parent = story !== null ? story.title : null;
    const parentUrl = story !== null ? url('stories.show', { story: story.id }) : null;
    const title = <FormattedMessage defaultMessage="Screens" descrition="Page title" />;

    return (
        <MainLayout
            nav={[
                { label: parent, url: parentUrl },
                { label: title, url: pathname },
            ]}
        >
            <Page
                title={title}
                sidebar={story !== null ? <StorySidebar story={story} /> : <div />}
                className={className}
            >
                {screens !== null && screens.length > 0 ? (
                    <ScreensProvider>
                        <Screens
                            items={screens.map((it) => ({
                                screen: it,
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

ShowPage.propTypes = propTypes;
ShowPage.defaultProps = defaultProps;

export default ShowPage;
