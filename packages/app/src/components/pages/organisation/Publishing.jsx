/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel } from '@micromag/core/components';
import { useNav } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import PublishForm from '../../forms/Publish';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationPublishingPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Settings" descrition="Page title" />;
    const nav = useNav(title, pathname);

    const organisation = useContextOrganisation();

    // const onChanged = useCallback(() => {
    //     load();
    // }, []);

    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    {organisation !== null ? <PublishForm organisation={organisation} /> : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationPublishingPage.propTypes = propTypes;
OrganisationPublishingPage.defaultProps = defaultProps;

export default OrganisationPublishingPage;
