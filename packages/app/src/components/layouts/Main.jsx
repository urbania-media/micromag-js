/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Navbar from '../partials/Navbar';

import styles from '../../styles/layouts/main.module.scss';

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    className: null,
};

const MainLayout = ({ children, className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <header className={styles.header}>
            <Navbar />
        </header>
        <main className={styles.content}>{children}</main>
        <footer className={styles.footer}>Footer</footer>
    </div>
);

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
