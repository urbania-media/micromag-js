/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TeamMemberItem from '../items/TeamMember';

const propTypes = {
    items: MicromagPropTypes.team,
    className: PropTypes.string,
    onClickRemoveMember: PropTypes.func,
};

const defaultProps = {
    items: [],
    className: null,
    onClickRemoveMember: null,
};

const TeamList = ({ items, className, onClickRemoveMember }) => (
    <div
        className={classNames([
            'list-group',
            {
                [className]: className !== null,
            },
        ])}
    >
        {items.map(it => (
            <TeamMemberItem
                key={`member-${it.id}`}
                item={it}
                canRemove={items.length > 1}
                onClickRemove={onClickRemoveMember !== null ? () => onClickRemoveMember(it) : null}
            />
        ))}
    </div>
);

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;

export default TeamList;
