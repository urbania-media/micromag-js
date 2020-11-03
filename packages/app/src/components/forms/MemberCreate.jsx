/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useOrganisationMemberCreate } from '@micromag/data';
import { Autocomplete } from '@micromag/fields';
import { Button } from '@micromag/core/components';

import AddButton from '../buttons/Add';
import RemoveButton from '../buttons/Remove';
import { validateEmail } from '../../lib/utils';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/forms/team-member-create.module.scss';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    className: PropTypes.string,
    onCreated: PropTypes.func,
};

const defaultProps = {
    className: null,
    onCreated: null,
};

const MemberCreate = ({ organisation, className, onCreated }) => {
    const [creatingItems, setCreatingItems] = useState([]);

    const { create: createMember } = useOrganisationMemberCreate(organisation.id);
    const postForm = useCallback((data) => createMember(data), [createMember]);

    const addTeamMember = useCallback(
        (email) => {
            if (email) {
                postForm({ email, role: 'user' }).then((member) => {
                    setCreatingItems(creatingItems.filter((val) => val !== email));
                    if (onCreated !== null) {
                        onCreated(member);
                    }
                });
            }
        },
        [creatingItems, setCreatingItems, postForm, onCreated],
    );

    const addCreatingItems = useCallback(() => {
        setCreatingItems([...creatingItems, '']);
    }, [creatingItems, setCreatingItems]);

    const changeCreatingItems = useCallback(
        (index, value) => {
            setCreatingItems(creatingItems.map((email, i) => (i === index ? value : email)));
        },
        [creatingItems, setCreatingItems],
    );

    const removeCreatingItems = useCallback(
        (index) => {
            setCreatingItems(
                creatingItems
                    .map((email, i) => (i === index ? null : email))
                    .filter((email) => email !== null),
            );
        },
        [creatingItems, setCreatingItems],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="d-flex justify-content-end w-100 my-1">
                <AddButton className="my-0" onClick={addCreatingItems} />
            </div>
            <div>
                {creatingItems.map((email, index) => (
                    <div className="d-flex w-100 my-1" key={`email-${index + 1}`}>
                        <Autocomplete
                            className="flex-fill"
                            value={email}
                            onChange={(value) => {
                                changeCreatingItems(index, value);
                            }}
                        >
                            <ul className="list-group">
                                <li className="list-group-item p-0">
                                    <Button
                                        className="btn btn-link"
                                        onClick={() => addTeamMember(email)}
                                        disabled={!validateEmail(email)}
                                        data-email={email}
                                    >
                                        <FormattedMessage
                                            defaultMessage="Invite"
                                            description="Invite member prefix"
                                        />{' '}
                                        <strong>{email}</strong>
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
        </div>
    );
};

MemberCreate.propTypes = propTypes;
MemberCreate.defaultProps = defaultProps;

export default MemberCreate;
