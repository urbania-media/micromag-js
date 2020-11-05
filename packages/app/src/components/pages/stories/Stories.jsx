import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AllStories from '../../partials/AllStories';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoriesPage = ({ className }) => {
    const url = useUrlGenerator();
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage defaultMessage="Stories" description="Stories page title" />
                }
                sidebar={
                    <>
                        <Button href={url('stories.create')} theme="primary">
                            <FormattedMessage
                                defaultMessage="Create a new story"
                                description="Create a new story page sidebar"
                            />
                        </Button>
                    </>
                }
                className={className}
            >
                <AllStories />
            </Page>
        </MainLayout>
    );
};

StoriesPage.propTypes = propTypes;
StoriesPage.defaultProps = defaultProps;

export default StoriesPage;
