/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MainNavbar from '../navbars/Main';

import styles from '../../styles/layouts/main.module.scss';

const propTypes = {
    navbar: PropTypes.node,
    nav: MicromagPropTypes.breadcrumbs,
    children: PropTypes.node,
    contentAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    fullscreen: PropTypes.bool,
    withoutHeader: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    navbar: null,
    nav: null,
    children: null,
    contentAlign: 'top',
    fullscreen: false,
    withoutHeader: false,
    className: null,
};

const MainLayout = ({
    navbar,
    nav,
    children,
    contentAlign,
    fullscreen,
    withoutHeader,
    className,
}) => (
    <div
        className={classNames([
            styles.container,
            {
                [styles.fullscreen]: fullscreen,
                [className]: className !== null,
            },
        ])}
    >
        <header
            className={classNames([
                styles.header,
                {
                    [styles.hidden]: withoutHeader,
                },
            ])}
        >
            {navbar !== null ? navbar : <MainNavbar nav={nav} />}
        </header>
        <main
            className={classNames([
                styles.content,
                {
                    [styles[contentAlign]]: contentAlign !== null && contentAlign !== 'top',
                },
            ])}
        >
            {children}
        </main>
    </div>
);

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
