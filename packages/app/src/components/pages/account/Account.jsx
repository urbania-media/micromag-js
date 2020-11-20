/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel } from '@micromag/core/components';
import { useOrganisations } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import AccountSidebar from '../../sidebars/Account';
import OrganisationPartial from '../../partials/Organisation';
import ProfileForm from '../../forms/AccountProfile';
import DeleteForm from '../../forms/AccountDelete';

import styles from '../../../styles/pages/account/account.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const AccountPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Profile" description="Page title" />;
    const nav = [{ label: title, url: pathname }];

    const { organisations: userOrganisations, loading } = useOrganisations();
    const organisations = userOrganisations || [];
    const hasOrganisations = organisations.length > 0;

    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
                sidebar={<AccountSidebar asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    <ProfileForm />
                </FormPanel>
                <div className={styles.separator} />
                <FormPanel
                    loading={loading}
                    description={
                        <div className={styles.description}>
                            <h4>
                                <FormattedMessage
                                    defaultMessage="Delete profile"
                                    description="Delete profile section title"
                                />
                            </h4>
                            {hasOrganisations ? (
                                <>
                                    <div className={styles.description}>
                                        <FormattedMessage
                                            defaultMessage="You cannot delete your profile because you are part of the following organisations:"
                                            description="Cannot delete profile description"
                                        />
                                    </div>
                                    {organisations.map((organisation) => (
                                        <OrganisationPartial
                                            className="d-block mb-2 mr-2"
                                            organisation={organisation}
                                            withoutHeader
                                        />
                                    ))}
                                </>
                            ) : (
                                <FormattedMessage
                                    defaultMessage="Are you sure you want to delete your profile? This action cannot be reversed."
                                    description="Delete your profile description"
                                />
                            )}
                        </div>
                    }
                >
                    {!hasOrganisations && !loading ? <DeleteForm /> : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

AccountPage.propTypes = propTypes;
AccountPage.defaultProps = defaultProps;

export default AccountPage;
