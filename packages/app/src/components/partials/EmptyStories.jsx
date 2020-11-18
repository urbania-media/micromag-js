import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const EmptyStories = ({ className }) => {
    const url = useUrlGenerator();
    return (
        <section className={className}>
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
        </section>
    );
};

EmptyStories.propTypes = propTypes;
EmptyStories.defaultProps = defaultProps;

export default EmptyStories;
