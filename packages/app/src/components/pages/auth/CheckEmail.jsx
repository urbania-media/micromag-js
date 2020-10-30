/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { FormPanel, Link } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';

import styles from '../../../styles/pages/auth/check-email.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CheckEmailPage = ({ className }) => {
    const url = useUrlGenerator();
    const intl = useIntl();
    const { email: paramsEmail = null } = useParams();
    const email =
        paramsEmail !== null
            ? paramsEmail
            : intl.formatMessage({
                  defaultMessage: 'email',
                  description: 'Email check email message value',
              });
    return (
        <MainLayout contentAlign="middle">
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Check your email"
                        description="Check email page title"
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
                                defaultMessage="Instructions to reset your password have been sent to your {email}."
                                description="Check email page description"
                                values={{
                                    email,
                                }}
                            />
                        </div>
                    }
                >
                    <div className={styles.links}>
                        <Link href={url('auth.login')}>
                            <FormattedMessage
                                defaultMessage="Go back to login"
                                description="Back to login link"
                            />
                        </Link>
                    </div>
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

CheckEmailPage.propTypes = propTypes;
CheckEmailPage.defaultProps = defaultProps;

export default CheckEmailPage;
