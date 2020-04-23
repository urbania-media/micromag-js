/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import PageHeader from '../partials/PageHeader';

import styles from '../../styles/pages/home.module.scss';

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

const HomePage = ({ className }) => (
    <div
        className={classNames([
            'container',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <PageHeader title={messages.title} />
    </div>
);

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

export default HomePage;
