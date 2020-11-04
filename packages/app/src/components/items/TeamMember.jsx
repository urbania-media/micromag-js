/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { Select } from '@micromag/fields';
import { useOrganisationRoles } from '@micromag/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import * as AppPropTypes from '../../lib/PropTypes';
import { useUser } from '../../contexts/AuthContext';

const propTypes = {
    member: AppPropTypes.teamMember.isRequired,
    className: PropTypes.string,
    onClickRemove: PropTypes.func,
    onChangeRole: PropTypes.func,
};

const defaultProps = {
    className: null,
    onClickRemove: null,
    onChangeRole: null,
};

const TeamMember = ({ member, className, onClickRemove, onChangeRole }) => {
    const currentUser = useUser();
    const { roles } = useOrganisationRoles();
    const { user = null, email, role } = member;
    const isSelf = user !== null && currentUser.id === user.id;
    const canRemove = onClickRemove !== null;
    const canEdit = onChangeRole !== null;

    const onChange = useCallback(
        (newRole) => {
            onChangeRole({ ...member, role: newRole });
        },
        [member],
    );

    const onClick = useCallback(() => {
        onClickRemove(member);
    }, [member]);

    return (
        <div
            className={classNames([
                'list-group-item',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="d-flex align-items-center">
                <div className="w-50">
                    <strong className="mr-2 text-truncate">{user ? user.name : email}</strong>
                    {!user ? (
                        <div className="text-truncate font-weight-light">
                            <FormattedMessage
                                defaultMessage="Invitation envoyée"
                                description="Quit button label"
                            />
                        </div>
                    ) : null}
                </div>
                {canEdit ? (
                    <Select
                        className="ml-4 w-25"
                        value={role}
                        onChange={onChange}
                        options={roles}
                        disabled={isSelf}
                    />
                ) : null}
                {canRemove ? (
                    <Button className="btn btn-primary ml-4 w-25" onClick={onClick}>
                        {isSelf ? (
                            <FontAwesomeIcon icon={faTimesCircle} />
                        ) : (
                            <FontAwesomeIcon icon={faTrash} />
                        )}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

TeamMember.propTypes = propTypes;
TeamMember.defaultProps = defaultProps;

export default TeamMember;
