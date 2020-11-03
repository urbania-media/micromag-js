/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
    item: AppPropTypes.teamMember.isRequired,
    canRemove: PropTypes.bool,
    canEdit: PropTypes.bool,
    className: PropTypes.string,
    onClickRemove: PropTypes.func,
    onChangeRole: PropTypes.func,
};

const defaultProps = {
    canRemove: false,
    canEdit: false,
    className: null,
    onClickRemove: null,
    onChangeRole: null,
};

const TeamMember = ({ item, canRemove, canEdit, className, onClickRemove, onChangeRole }) => {
    const currentUser = useUser();
    const { roles } = useOrganisationRoles();
    const { user = null, email, role } = item;
    const isSelf = user !== null && currentUser.id === user.id;
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
                        onChange={onChangeRole}
                        options={roles}
                        disabled={isSelf}
                    />
                ) : null}
                {canRemove ? (
                    <Button className="btn btn-primary ml-4 w-25" onClick={onClickRemove}>
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
