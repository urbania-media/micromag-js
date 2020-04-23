/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import PageHeader from '../../partials/PageHeader';

import styles from '../../../styles/pages/register/register.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.register.title',
        defaultMessage: 'Register',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const RegisterPage = ({ className }) => (
    <div
        className={classNames([
            'container-small',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <PageHeader title={messages.title} />
    </div>
);

RegisterPage.propTypes = propTypes;
RegisterPage.defaultProps = defaultProps;

export default RegisterPage;
