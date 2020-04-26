/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';

import styles from '../../styles/partials/page-header.module.scss';

const propTypes = {
    title: MicromagPropTypes.label,
    section: MicromagPropTypes.label,
    children: PropTypes.node,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    sectionClassName: PropTypes.string,
};

const defaultProps = {
    title: null,
    section: null,
    children: null,
    className: null,
    titleClassName: null,
    sectionClassName: null,
};

const LoginPage = ({ title, section, children, className, titleClassName, sectionClassName }) => (
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
            <Label>{section !== null ? section : title}</Label>
            {section !== null ? (
                <>
                    {' / '}
                    <small
                        className={classNames([
                            'text-muted',
                            styles.section,
                            {
                                [sectionClassName]: sectionClassName !== null,
                            },
                        ])}
                    >
                        <Label>{title}</Label>
                    </small>
                </>
            ) : null}
        </h1>
        {children}
    </header>
);

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;
