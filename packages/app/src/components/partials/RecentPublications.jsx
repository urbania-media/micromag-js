/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useStoryPublications } from '@micromag/data';

import StoryPublications from '../lists/StoryPublications';

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
    const { publications } = useStoryPublications(story.id, null, null, count);
    return publications !== null && publications.length > 0 ? (
        <section className={className}>
            <h4>
                <FormattedMessage defaultMessage="Recent publications" description="Card title" />
            </h4>
            <StoryPublications items={publications} />
        </section>
    ) : null;
};

RecentPublications.propTypes = propTypes;
RecentPublications.defaultProps = defaultProps;

export default RecentPublications;
