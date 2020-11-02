/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router';
import { parse as parseQueryString } from 'query-string';
import { FormPanel } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useSetOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationCreateForm from '../../forms/OrganisationCreate';

import styles from '../../../styles/pages/organisation/create.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationCreatePage = ({ className }) => {
    const url = useUrlGenerator();
    const history = useHistory();
    const setOrganisation = useSetOrganisation();
    const { search } = useLocation();
    const { next = null } = parseQueryString(search);
    const onCreated = useCallback(
        (org) => {
            setOrganisation(org);
            history.push(next !== null ? next : url('home'));
        },
        [history, url, setOrganisation],
    );
    return (
        <MainLayout contentAlign="middle">
            <Page
                title={
                    <FormattedMessage
                        defaultMessage="Create an organisation"
                        descrition="Create org page title"
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
                                defaultMessage="Please fill all the fields below."
                                descrition="Form description"
                            />
                        </div>
                    }
                >
                    <OrganisationCreateForm onCreated={onCreated} />
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationCreatePage.propTypes = propTypes;
OrganisationCreatePage.defaultProps = defaultProps;

export default OrganisationCreatePage;
