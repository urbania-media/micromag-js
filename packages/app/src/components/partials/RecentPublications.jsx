/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';
import { useStoryPublications } from '@micromag/data';

import StoryPublications from '../lists/StoryPublications';

const messages = defineMessages({
    title: {
        id: 'recent_publications.title',
        defaultMessage: 'Recent publications',
    },
});

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    count: 5,
    className: null,
};

const RecentPublications = ({ story, count, className }) => {
    const { publications, loading } = useStoryPublications(story.id, null, null, count);
    return !loading && publications.length > 0 ? (
        <section className={className}>
            <h4>
                <Label>{messages.title}</Label>
            </h4>
            <StoryPublications items={publications} />
        </section>
    ) : null;
};

RecentPublications.propTypes = propTypes;
RecentPublications.defaultProps = defaultProps;

export default RecentPublications;
