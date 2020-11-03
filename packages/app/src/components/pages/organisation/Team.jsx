/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useOrganisationTeam } from '@micromag/data';

import { FormPanel } from '@micromag/core/components';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import { useUser } from '../../../contexts/AuthContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import TeamList from '../../lists/Team';
import MemberCreateForm from '../../forms/MemberCreate';

import styles from '../../../styles/pages/organisation/team.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationTeamPage = ({ className }) => {
    const user = useUser();
    const organisation = useContextOrganisation();
    const { team, load } = useOrganisationTeam(organisation.id);
    const onCreated = useCallback(() => {
        load();
    }, []);

    const role = user.role || 'admin';
    const isAdmin = role === 'admin' || true;
    const teamFeatures = isAdmin ? { canAdd: true, canEdit: true, canRemove: true } : null;

    return (
        <MainLayout>
            <Page
                section={
                    <FormattedMessage
                        defaultMessage="Organisation"
                        description="Organisation section title"
                    />
                }
                title={<FormattedMessage defaultMessage="Team" description="Team page title" />}
                sidebar={<OrganisationMenu asList />}
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            >
                <FormPanel>
                    {teamFeatures && teamFeatures.canAdd ? (
                        <MemberCreateForm organisation={organisation} onCreated={onCreated} />
                    ) : null}
                    {team !== null ? <TeamList items={team} {...teamFeatures} /> : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationTeamPage.propTypes = propTypes;
OrganisationTeamPage.defaultProps = defaultProps;

export default OrganisationTeamPage;
