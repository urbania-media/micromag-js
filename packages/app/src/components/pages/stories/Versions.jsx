import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { useStory, useStoryVersions } from '@micromag/data';
import { FormPanel } from '@micromag/core/components';
import { useFormattedDate } from '@micromag/core/hooks';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StoryBox from '../../partials/StoryBox';
import VersionsList from '../../lists/Versions';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryVersionsPage = ({ className }) => {
    const getDate = useFormattedDate();
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    const { versions } = useStoryVersions(storyId);

    const byDate =
        versions !== null
            ? versions.reduce((acc, ver) => {
                  const { created_at: createdAt = null } = ver;
                  const date = getDate(createdAt);
                  if (!acc[date]) {
                      acc[date] = [];
                  }
                  acc[date].push(ver);
                  return acc;
              }, {})
            : {};
    const hasData = story !== null && versions !== null && versions.length > 0;

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Versions" description="Versions page title" />
                }
                title={story !== null ? story.title : null}
                sidebar={story !== null ? <StoryBox story={story} /> : <div />}
                className={className}
            >
                <FormPanel>
                    {hasData ? (
                        Object.keys(byDate).map((date) => (
                            <VersionsList
                                key={`versions-${date}`}
                                title={date}
                                items={byDate[date]}
                            />
                        ))
                    ) : (
                        <FormattedMessage
                            defaultMessage="No versions yet"
                            description="No versions yet message"
                        />
                    )}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

StoryVersionsPage.propTypes = propTypes;
StoryVersionsPage.defaultProps = defaultProps;

export default StoryVersionsPage;
