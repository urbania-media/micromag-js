/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useOrganisationTeam } from '@micromag/data';

import { useOrganisation } from '../../../contexts/OrganisationContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import TeamList from '../../lists/Team';

import styles from '../../../styles/pages/organisation/team.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationTeamPage = ({ className }) => {
    const organisation = useOrganisation();
    const { team } = useOrganisationTeam(organisation.id);
    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage defaultMessage="Organisation" descrition="Section title" />
                }
                title={<FormattedMessage defaultMessage="Team" descrition="Page title" />}
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                {team !== null ? <TeamList items={team} /> : null}
            </Page>
        </MainLayout>
    );
};

OrganisationTeamPage.propTypes = propTypes;
OrganisationTeamPage.defaultProps = defaultProps;

export default OrganisationTeamPage;
