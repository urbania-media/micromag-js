/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';

import styles from '../../styles/partials/page-header.module.scss';

const propTypes = {
    title: MicromagPropTypes.label,
    children: PropTypes.node,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
};

const defaultProps = {
    title: null,
    children: null,
    className: null,
    titleClassName: null,
};

const LoginPage = ({ title, children, className, titleClassName }) => (
    <header
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <h1
            className={classNames([
                'display-4',
                styles.title,
                {
                    [titleClassName]: titleClassName !== null,
                },
            ])}
        >
            <Label>{title}</Label>
        </h1>
        {children}
    </header>
);

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;
