/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Card } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import OrganisationMenu from '../menus/Organisation';

import styles from '../../styles/partials/organisation-box.module.scss';

const messages = defineMessages({
    title: {
        id: 'organisation-box.title',
        defaultMessage: 'Organisation',
    },
    profile: {
        id: 'organisation-box.profile',
        defaultMessage: 'Profile',
    },
    settings: {
        id: 'organisation-box.settings',
        defaultMessage: 'Settings',
    },
});

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    withoutHeader: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    withoutHeader: false,
    className: null,
};

const OrganisationBox = ({ organisation, withoutHeader, className }) => {
    return (
        <Card
            header={!withoutHeader ? messages.title : null}
            title={organisation.name}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            afterBody={<OrganisationMenu asList flush />}
            bodyClassName={styles.body}
        />
    );
};

OrganisationBox.propTypes = propTypes;
OrganisationBox.defaultProps = defaultProps;

export default OrganisationBox;
