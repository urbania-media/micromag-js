/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TeamMemberItem from '../items/TeamMember';

const propTypes = {
    items: MicromagPropTypes.team,
    canCreate: PropTypes.bool,
    canEdit: PropTypes.bool,
    canRemove: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: [],
    canCreate: true,
    canEdit: true,
    canRemove: true,
    className: null,
};

const TeamList = ({ items, canCreate, canEdit, canRemove, className }) => {
    const onMemberCreate = useCallback(() => {}, []);
    const onClickMemberRemove = useCallback(() => {}, []);
    const onChangeMemberRole = useCallback(() => {}, []);

    return (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {items.map((it) => (
                <TeamMemberItem
                    key={`member-${it.id}`}
                    item={it}
                    canRemove={canRemove && items.length > 1}
                    canEdit={canEdit}
                    onClickRemove={canRemove ? onClickMemberRemove : null}
                    onChangeRole={onChangeMemberRole}
                />
            ))}
        </div>
    );
};

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;

export default TeamList;
