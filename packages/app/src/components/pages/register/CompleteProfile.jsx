/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { FormPanel } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../../contexts/AuthContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
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
    const history = useHistory();
    const { setUser } = useAuth();
    const onContinue = useCallback(
        (showInvite = false) => {
            if (showInvite) {
                history.push(url('register.invite'));
            } else {
                history.push(url('home'));
            }
        },
        [history, url, setUser],
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
                                defaultMessage="Your account has been created. Please complete your profile to create your first Micromag."
                                description="Complete profile page description"
                            />
                        </div>
                    }
                >
                    <CompleteProfileForm onContinue={onContinue} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

CompleteProfile.propTypes = propTypes;
CompleteProfile.defaultProps = defaultProps;

export default CompleteProfile;
