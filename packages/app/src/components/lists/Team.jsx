/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TeamMemberItem from '../items/TeamMember';

const propTypes = {
    items: MicromagPropTypes.team,
    onChangeRole: PropTypes.func,
    onClickRemove: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    onChangeRole: true,
    onClickRemove: true,
    className: null,
};

const TeamList = ({ items, onChangeRole, onClickRemove, className }) => {
    return (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {items.map((member) => (
                <TeamMemberItem
                    key={`member-${member.id}`}
                    member={member}
                    onClickRemove={onClickRemove}
                    onChangeRole={onChangeRole}
                />
            ))}
        </div>
    );
};

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;

export default TeamList;
