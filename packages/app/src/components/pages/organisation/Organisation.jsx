/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../../styles/pages/organisation/organisation.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationPage = ({ className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        organisation
    </div>
);

OrganisationPage.propTypes = propTypes;
OrganisationPage.defaultProps = defaultProps;

export default OrganisationPage;
