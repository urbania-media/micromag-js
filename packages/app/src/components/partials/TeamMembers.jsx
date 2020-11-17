/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@micromag/core/components';
import { useOrganisationTeam } from '@micromag/data';
import { useUrlGenerator } from '@micromag/core/contexts';

import Avatar from './Avatar';

import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/team-members.module.scss';

const propTypes = {
    organisation: AppPropTypes.organisation,
    withoutAdd: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    organisation: [],
    withoutAdd: false,
    className: null,
};

const TeamMembers = ({ organisation, withoutAdd, className }) => {
    const url = useUrlGenerator();
    const { team } = useOrganisationTeam(organisation.id);

    const plusClassNames = classNames(['btn', 'btn-primary', styles.item, styles.plus]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                {team !== null
                    ? team.map(({ invitation, user }) =>
                          user && !invitation ? <Avatar className={styles.item} {...user} /> : null,
                      )
                    : null}
                {!withoutAdd ? (
                    <Button href={url('organisation.team')} className={plusClassNames}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

TeamMembers.propTypes = propTypes;
TeamMembers.defaultProps = defaultProps;

export default TeamMembers;
