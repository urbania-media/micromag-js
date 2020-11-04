/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FormPanel } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';
import { useOrganisations } from '@micromag/data';

import { useAuth } from '../../../contexts/AuthContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationPreview from '../../partials/OrganisationPreview';
import CompleteProfileForm from '../../forms/CompleteProfile';

import styles from '../../../styles/pages/register/register.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CompleteProfile = ({ className }) => {
    const url = useUrlGenerator();
    const push = useRoutePush();
    const { organisations } = useOrganisations();
    const { setUser } = useAuth();
    const onContinue = useCallback(
        (showInvite = false) => {
            if (showInvite) {
                push(url('register.invite'));
            } else {
                push(url('home'));
            }
        },
        [push, url, setUser],
    );
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Complete profile"
                        description="Complete profile page title"
                    />
                }
                small
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel
                    description={
                        <div className={styles.description}>
                            <FormattedMessage
                                defaultMessage="Your account has been created. Please complete your profile."
                                description="Complete profile page description"
                            />
                        </div>
                    }
                >
                    <CompleteProfileForm onContinue={onContinue} />
                    {organisations !== null && organisations.length > 0 ? (
                        <>
                            <hr />
                            <p>
                                <FormattedMessage
                                    defaultMessage="You are a member of the following organisations:"
                                    description="Complete profile organisations description"
                                />
                            </p>
                            {organisations.map((org) => (
                                <OrganisationPreview organisation={org} />
                            ))}
                        </>
                    ) : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

CompleteProfile.propTypes = propTypes;
CompleteProfile.defaultProps = defaultProps;

export default CompleteProfile;
