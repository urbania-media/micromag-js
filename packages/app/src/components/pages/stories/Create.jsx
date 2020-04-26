/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import MainLayout from '../../layouts/Main';
import PageHeader from '../../partials/PageHeader';

import styles from '../../../styles/pages/stories/create.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.stories.create.title',
        defaultMessage: 'Create a story',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoriesCreatePage = ({ className }) => (
    <MainLayout>
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
    </MainLayout>
);

StoriesCreatePage.propTypes = propTypes;
StoriesCreatePage.defaultProps = defaultProps;

export default StoriesCreatePage;
