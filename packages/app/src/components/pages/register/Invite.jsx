/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { FormPanel } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import InviteForm from '../../forms/Invite';

import styles from '../../../styles/pages/register/register.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const InvitePage = ({ className }) => {
    const url = useUrlGenerator();
    const history = useHistory();
    const onContinue = useCallback(() => {
        history.push(url('home'));
    }, [history, url]);
    return (
        <MainLayout>
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Invite collaborators"
                        description="Invite collaborators page title"
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
                                defaultMessage="Invite your team members to your organisation."
                                description="Invite page description"
                            />
                        </div>
                    }
                >
                    <InviteForm onContinue={onContinue} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

InvitePage.propTypes = propTypes;
InvitePage.defaultProps = defaultProps;

export default InvitePage;
