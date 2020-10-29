/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useOrganisations } from '@micromag/data';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';
import AccountBox from '../partials/AccountBox';
import OrganisationsList from '../lists/Organisations';
import RecentStories from '../partials/RecentStories';

import styles from '../../styles/pages/home.module.scss';

const propTypes = {
    recentStoriesCount: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    recentStoriesCount: 6,
    className: null,
};

const HomePage = ({ recentStoriesCount, className }) => {
    const url = useUrlGenerator();
    const { organisations } = useOrganisations();
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Micromag"
                        description="Micromag home page title"
                    />
                }
                sidebar={
                    <div className="d-flex flex-column">
                        <section className="mb-4">
                            <h5 className="mb-2">
                                <FormattedMessage
                                    defaultMessage="Your account"
                                    description="Your account home sidebar"
                                />
                            </h5>
                            <AccountBox withoutHeader />
                        </section>
                        {organisations !== null ? (
                            <section>
                                {organisations.length > 0 ? (
                                    <h5 className="mb-2">
                                        {organisations.length === 1 ? (
                                            <FormattedMessage
                                                defaultMessage="Your organisation"
                                                description="Your organisation home sidebar"
                                            />
                                        ) : (
                                            <FormattedMessage
                                                defaultMessage="Your organisations"
                                                description="Your organisations home sidebar"
                                            />
                                        )}
                                    </h5>
                                ) : null}
                                <OrganisationsList items={organisations} />
                                <Button
                                    href={url('organisation.create')}
                                    theme="secondary"
                                    className={classNames([
                                        'w-100',
                                        {
                                            'mt-2': organisations.length > 0,
                                        },
                                    ])}
                                >
                                    <FormattedMessage
                                        defaultMessage="Create an organisation"
                                        description="Create organisation button label"
                                    />
                                </Button>
                            </section>
                        ) : null}
                    </div>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <RecentStories count={recentStoriesCount} />
            </Page>
        </MainLayout>
    );
};

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
