/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useRecentStories } from '@micromag/data';

import StoriesList from '../lists/Stories';

const propTypes = {
    count: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    count: 6,
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
                        <FormattedMessage defaultMessage="Recent stories" description="Box title" />
                    </h5>
                    <StoriesList items={stories} />
                    <div className={classNames(['d-flex', 'mt-4'])}>
                        <Button href={url('stories')} theme="primary" className="mr-2">
                            <FormattedMessage
                                defaultMessage="All stories"
                                description="All stories button label"
                            />
                        </Button>
                        <Button href={url('stories.create')} theme="primary" className="mr-2">
                            <FormattedMessage
                                defaultMessage="Create a story"
                                description="Create a story button label"
                            />
                        </Button>
                    </div>
                </>
            ) : null}
        </section>
    ) : null;
};

RecentStories.propTypes = propTypes;
RecentStories.defaultProps = defaultProps;

export default RecentStories;
