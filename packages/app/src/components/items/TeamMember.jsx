/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { Button, Label } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import { useUser } from '../../contexts/AuthContext';

const messages = defineMessages({
    remove: {
        id: 'items.team_member.remove',
        defaultMessage: 'Remove',
    },
    quit: {
        id: 'items.team_member.quit',
        defaultMessage: 'Leave',
    },
    admin: {
        id: 'roles.admin',
        defaultMessage: 'Administrator',
    },
    user: {
        id: 'roles.user',
        defaultMessage: 'User',
    },
});

const propTypes = {
    item: AppPropTypes.teamMember.isRequired,
    canRemove: PropTypes.bool,
    className: PropTypes.string,
    onClickRemove: PropTypes.func,
};

const defaultProps = {
    canRemove: false,
    className: null,
    onClickRemove: null,
};

const TeamMember = ({ item, canRemove, className, onClickRemove }) => {
    const currentUser = useUser();
    const { user = null, email, role } = item;
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
                <span className="text-muted">
                    <Label>{messages[role] || messages.user}</Label>
                </span>
                {canRemove ? (
                    <Button className="ml-4" onClick={onClickRemove}>
                        {user !== null && currentUser.id === user.id
                            ? messages.quit
                            : messages.remove}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

TeamMember.propTypes = propTypes;
TeamMember.defaultProps = defaultProps;

export default TeamMember;
