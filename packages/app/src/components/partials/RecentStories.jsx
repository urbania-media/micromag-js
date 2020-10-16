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
                        <FormattedMessage defaultMessage="Recent stories" description="Box title" />
                    </h5>
                    <StoriesList items={stories} />
                    <div className={classNames(['d-flex', 'mt-4'])}>
                        <Button href={url('stories.create')} theme="primary" className="mr-2">
                            <FormattedMessage
                                defaultMessage="Create a story"
                                description="Button label"
                            />
                        </Button>
                        <Button href={url('stories')} theme="secondary">
                            <FormattedMessage
                                defaultMessage="View all stories"
                                description="Button label"
                            />
                        </Button>
                    </div>
                </>
            ) : (
                <div className="jumbotron text-center bg-dark text-light">
                    <h1 className="display-4">
                        <FormattedMessage defaultMessage="No story yet" description="Box title" />
                    </h1>
                    <p className="lead mt-4 mb-4">
                        <FormattedMessage
                            defaultMessage="It’s time to start creating now."
                            description="Box description"
                        />
                    </p>
                    <p className="lead pt-4">
                        <Button href={url('stories.create')} theme="primary" size="lg">
                            <FormattedMessage
                                defaultMessage="Create your first story"
                                description="Button label"
                            />
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
