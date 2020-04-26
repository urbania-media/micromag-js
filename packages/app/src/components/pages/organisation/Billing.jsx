/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MainLayout from '../../layouts/Main';

import styles from '../../../styles/pages/organisation/billing.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const OrganisationBillingPage = ({ className }) => (
    <MainLayout>
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            organisation billing
        </div>
    </MainLayout>
);

OrganisationBillingPage.propTypes = propTypes;
OrganisationBillingPage.defaultProps = defaultProps;

export default OrganisationBillingPage;
