/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';
import { Select } from '@micromag/fields';
import { useOrganisationRoles } from '@micromag/data';

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
                <strong className="flex-grow-1 mr-4">{user ? user.name : email}</strong>
                {canEdit ? (
                    <Select
                        className="ml-4"
                        value={role}
                        onChange={onChangeRole}
                        options={roles}
                        disabled={isSelf}
                    />
                ) : null}
                {canRemove ? (
                    <Button className="ml-4" onClick={onClickRemove}>
                        {isSelf ? (
                            <FormattedMessage
                                defaultMessage="Quit team"
                                description="Quit team button label"
                            />
                        ) : (
                            <FormattedMessage
                                defaultMessage="Remove"
                                description="Remove button label"
                            />
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
