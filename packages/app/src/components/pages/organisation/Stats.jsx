/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FormPanel } from '@micromag/core/components';
import { useOrganisation } from '@micromag/data';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationSidebar from '../../sidebars/Organisation';

import styles from '../../../styles/pages/organisation/stats.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StatsPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Stats" descrition="Page title" />;
    const nav = [{ label: title, url: pathname }];

    const currentOrganisation = useContextOrganisation();
    const { organisation } = useOrganisation(currentOrganisation.id);
    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
                sidebar={<OrganisationSidebar asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {organisation !== null ? <FormPanel>Global organisation stats</FormPanel> : null}
            </Page>
        </MainLayout>
    );
};

StatsPage.propTypes = propTypes;
StatsPage.defaultProps = defaultProps;

export default StatsPage;
