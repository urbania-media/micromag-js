/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Label, Button, Card } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useRecentStories } from '../../hooks/useData';
import StoriesList from '../lists/Stories';

const messages = defineMessages({
    title: {
        id: 'recent_stories.title',
        defaultMessage: 'Recent stories',
    },
    viewAll: {
        id: 'recent_stories.view_all',
        defaultMessage: 'View all stories',
    },
    create: {
        id: 'recent_stories.create',
        defaultMessage: 'Create a story',
    },
    createFirst: {
        id: 'recent_stories.create_first_story',
        defaultMessage: 'Create your first story',
    },
});

const propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    count: 3,
    className: null,
};

const RecentStories = ({ count, className }) => {
    const url = useUrlGenerator();
    const { stories, loading } = useRecentStories(count);
    return !loading ? (
        <section className={className}>
            {stories !== null && stories.length > 0 ? (
                <>
                    <h5 className="mb-2">
                        <Label>{messages.title}</Label>
                    </h5>
                    <StoriesList items={stories} />
                    <div className={classNames(['d-flex', 'mt-2'])}>
                        <Button href={url('stories')} theme="secondary" outline>
                            {messages.viewAll}
                        </Button>
                        <Button href={url('stories.create')} theme="secondary" outline>
                            {messages.create}
                        </Button>
                    </div>
                </>
            ) : (
                <div className="jumbotron">
                    <h1 className="display-4">No story yet</h1>
                    <p>It’s time to start creating.</p>
                    <p className="lead mt-4">
                        <Button href={url('stories.create')} theme="primary">
                            {messages.createFirst}
                        </Button>
                    </p>
                </div>
            )}
        </section>
    ) : null;
};

RecentStories.propTypes = propTypes;
RecentStories.defaultProps = defaultProps;

export default RecentStories;
