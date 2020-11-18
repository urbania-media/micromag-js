/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { parse as parseQueryString } from 'query-string';

import { FormPanel } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';
import { useNav } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useSetOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationCreateForm from '../../forms/OrganisationCreate';

import styles from '../../../styles/pages/organisation/create.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationCreatePage = ({ location: { pathname }, className }) => {
    const title = (
        <FormattedMessage defaultMessage="Create an organisation" descrition="Page title" />
    );
    const nav = useNav(title, pathname);

    const url = useUrlGenerator();
    const push = useRoutePush();
    const setOrganisation = useSetOrganisation();
    const { search } = useLocation();
    const { next = null } = parseQueryString(search);
    const onCreated = useCallback(
        (org) => {
            setOrganisation(org);
            push(next !== null ? next : url('register.invite'));
        },
        [push, url, next, setOrganisation],
    );

    return (
        <MainLayout contentAlign="top" nav={nav}>
            <Page
                title={title}
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
                                defaultMessage="Start by choosing a name for your organisation."
                                descrition="Choose a name create organisation description"
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
