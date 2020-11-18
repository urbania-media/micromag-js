/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import {
    useOrganisationTeam,
    useOrganisationMemberUpdate,
    useOrganisationMemberDelete,
} from '@micromag/data';
import { useRoutePush } from '@micromag/core/contexts';
import { FormPanel } from '@micromag/core/components';
import { useNav } from '@micromag/core/hooks';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import { useUser } from '../../../contexts/AuthContext';

import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import TeamList from '../../lists/Team';
import MemberCreateForm from '../../forms/MemberCreate';

import styles from '../../../styles/pages/organisation/team.module.scss';

const propTypes = {
    location: MicromagPropTypes.location.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationTeamPage = ({ location: { pathname }, className }) => {
    const title = <FormattedMessage defaultMessage="Team" description="Page title" />;
    const nav = useNav(title, pathname);

    const user = useUser();
    const push = useRoutePush();
    const organisation = useContextOrganisation();
    const { team, load } = useOrganisationTeam(organisation.id);
    const { update } = useOrganisationMemberUpdate(organisation.id);
    const { deleteMember } = useOrganisationMemberDelete(organisation.id);
    const onCreated = useCallback(() => {
        load();
    }, []);

    const role = user.role || 'admin';
    const isAdmin = role === 'admin' || true;

    // TODO: make this dynamic
    const teamFeatures = isAdmin ? { canAdd: true, canEdit: true, canRemove: true } : null;

    const onClickRemove = useCallback(
        (member) => {
            const { user: deletingUser = {} } = member;
            deleteMember(member.id)
                .then(() => load())
                .then(() => {
                    if (deletingUser.id === user.id) {
                        push('home');
                        window.location.reload();
                    }
                });
        },
        [deleteMember, load],
    );

    const onChangeRole = useCallback(
        (member) => {
            const { user: memberUser = {} } = member;
            update(member.id, {
                email: memberUser.email || member.email || null,
                role: member.role || null,
            }).then(() => load());
        },
        [update, load],
    );

    return (
        <MainLayout nav={nav}>
            <Page
                title={title}
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
                    {team !== null ? (
                        <TeamList
                            items={team}
                            onChangeRole={isAdmin ? onChangeRole : null}
                            onClickRemove={isAdmin ? onClickRemove : null}
                        />
                    ) : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationTeamPage.propTypes = propTypes;
OrganisationTeamPage.defaultProps = defaultProps;

export default OrganisationTeamPage;
