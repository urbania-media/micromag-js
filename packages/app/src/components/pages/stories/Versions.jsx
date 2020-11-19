import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { useStory, useStoryVersions } from '@micromag/data';
import { FormPanel } from '@micromag/core/components';
import { useFormattedDate } from '@micromag/core/hooks';
import { Toggle } from '@micromag/fields';
import { useUrlGenerator } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import StorySidebar from '../../sidebars/Story';
import VersionsList from '../../lists/Versions';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryVersionsPage = ({ location: { pathname }, className }) => {
    const url = useUrlGenerator();
    const [filterPublished, setFilterPublished] = useState();
    const getDate = useFormattedDate();
    const { story: storyId } = useParams();
    const { story } = useStory(storyId);
    const { versions } = useStoryVersions(storyId);

    const parent = story !== null ? story.title : null;
    const parentUrl = story !== null ? url('stories.show', { story: story.id }) : null;
    const title = <FormattedMessage defaultMessage="Versions" descrition="Page title" />;

    const onFilteredChange = useCallback(() => {
        setFilterPublished((published) => !published);
    }, [setFilterPublished]);

    const filtered =
        versions !== null && filterPublished
            ? versions.filter((version) => version.published)
            : versions;

    const byDate =
        filtered !== null
            ? filtered.reduce((acc, version) => {
                  const { created_at: createdAt = null } = version;
                  const date = getDate(createdAt);
                  if (!acc[date]) {
                      acc[date] = [];
                  }
                  acc[date].push(version);
                  return acc;
              }, {})
            : {};

    const hasData = story !== null && versions !== null && versions.length > 0;
    const hasPublished = hasData && versions.find((version) => version.published || 1);

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
                <FormPanel>
                    {hasPublished ? (
                        <div className="form-group w-100 d-flex align-items-center justify-content-between">
                            <div className="label">
                                <FormattedMessage
                                    defaultMessage="Only show published"
                                    description="Only show published field label"
                                />
                            </div>
                            <Toggle value={filterPublished} onChange={onFilteredChange} />
                        </div>
                    ) : null}
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
