/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import PageHeader from '../../partials/PageHeader';

import styles from '../../../styles/pages/stories/editor.module.scss';

const messages = defineMessages({
    title: {
        id: 'pages.editor.title',
        defaultMessage: 'Editor',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const EditorPage = ({ className }) => (
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

EditorPage.propTypes = propTypes;
EditorPage.defaultProps = defaultProps;

export default EditorPage;
