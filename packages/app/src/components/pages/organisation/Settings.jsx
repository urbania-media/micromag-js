/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../../styles/pages/organisation/settings.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationSettingsPage = ({ className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        organisation settings
    </div>
);

OrganisationSettingsPage.propTypes = propTypes;
OrganisationSettingsPage.defaultProps = defaultProps;

export default OrganisationSettingsPage;
