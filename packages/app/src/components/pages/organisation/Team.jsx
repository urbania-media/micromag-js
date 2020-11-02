/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useOrganisationTeam } from '@micromag/data';
import { Autocomplete } from '@micromag/fields';
import { Button, FormPanel } from '@micromag/core/components';

import { useOrganisation as useContextOrganisation } from '../../../contexts/OrganisationContext';
import { useUser } from '../../../contexts/AuthContext';
import MainLayout from '../../layouts/Main';
import Page from '../../partials/Page';
import OrganisationMenu from '../../menus/Organisation';
import TeamList from '../../lists/Team';
import AddButton from '../../buttons/Add';
import RemoveButton from '../../buttons/Remove';
import { validateEmail } from '../../../lib/utils';

import styles from '../../../styles/pages/organisation/team.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationTeamPage = ({ className }) => {
    const [creatingItems, setCreatingItems] = useState([]);
    const user = useUser();
    const organisation = useContextOrganisation();
    const { team } = useOrganisationTeam(organisation.id);
    const role = user.role || 'admin';
    const teamFeatures =
        role === 'admin' || true ? { canAdd: true, canEdit: true, canRemove: true } : null;

    const addTeamMember = useCallback(() => {
        // Callback to api, reload list and show
    }, [creatingItems, setCreatingItems]);

    const addCreatingItems = useCallback(() => {
        setCreatingItems([...creatingItems, '']);
    }, [creatingItems, setCreatingItems]);

    const changeCreatingItems = useCallback(
        (index, value) => {
            setCreatingItems(creatingItems.map((ci, i) => (i === index ? value : ci)));
        },
        [creatingItems, setCreatingItems],
    );

    const removeCreatingItems = useCallback(
        (index) => {
            setCreatingItems(
                creatingItems.map((ci, i) => (i === index ? null : ci)).filter((ci) => ci !== null),
            );
        },
        [creatingItems, setCreatingItems],
    );

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
                    {teamFeatures.canAdd ? (
                        <div className="d-flex justify-content-end w-100 my-1">
                            <AddButton className={styles.addButton} onClick={addCreatingItems} />
                        </div>
                    ) : null}
                    <div className={styles.creating}>
                        {creatingItems.map((ci, index) => (
                            <div className="d-flex w-100 my-1">
                                <Autocomplete
                                    className="flex-fill"
                                    value={ci}
                                    onChange={(value) => {
                                        changeCreatingItems(index, value);
                                    }}
                                >
                                    <ul className="list-group">
                                        <li className="list-group-item p-0">
                                            <Button
                                                className="btn btn-link"
                                                onClick={addTeamMember}
                                                disabled={!validateEmail(ci)}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Invite"
                                                    description="Invite member prefix"
                                                />{' '}
                                                <strong>{ci}</strong>
                                            </Button>
                                        </li>
                                    </ul>
                                </Autocomplete>
                                <RemoveButton
                                    className="ml-1"
                                    onClick={() => {
                                        removeCreatingItems(index);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {team !== null ? <TeamList items={team} {...teamFeatures} /> : null}
                </FormPanel>
            </Page>
        </MainLayout>
    );
};

OrganisationTeamPage.propTypes = propTypes;
OrganisationTeamPage.defaultProps = defaultProps;

export default OrganisationTeamPage;
