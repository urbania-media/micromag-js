/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import PageHeader from '../../partials/PageHeader';

import styles from '../../../styles/pages/stories/stories.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.stories.title',
        defaultMessage: 'Stories',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoriesPage = ({ className }) => (
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

StoriesPage.propTypes = propTypes;
StoriesPage.defaultProps = defaultProps;

export default StoriesPage;
