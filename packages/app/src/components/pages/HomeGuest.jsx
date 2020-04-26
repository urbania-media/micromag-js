/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../layouts/Main';
import Page from '../partials/Page';

import styles from '../../styles/pages/home-guest.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.home.title',
        defaultMessage: 'Micromag',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HomeGuestPage = ({ className }) => (
    <MainLayout>
        <Page
            title={messages.title}
            className={classNames([
                'container',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            Home
        </Page>
    </MainLayout>
);

HomeGuestPage.propTypes = propTypes;
HomeGuestPage.defaultProps = defaultProps;

export default HomeGuestPage;
