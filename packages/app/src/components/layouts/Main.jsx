/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Navbar from '../partials/Navbar';
import Footer from '../partials/Footer';

import styles from '../../styles/layouts/main.module.scss';

const propTypes = {
    children: PropTypes.node,
    fullscreen: PropTypes.bool,
    withoutHeader: PropTypes.bool,
    withoutFooter: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    fullscreen: false,
    withoutHeader: false,
    withoutFooter: false,
    className: null,
};

const MainLayout = ({ children, fullscreen, withoutHeader, withoutFooter, className }) => {
    return (
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
                <Navbar />
            </header>
            <main className={styles.content}>{children}</main>
            <footer
                className={classNames([
                    styles.header,
                    {
                        [styles.hidden]: withoutFooter || fullscreen,
                    },
                ])}
            >
                <Footer />
            </footer>
        </div>
    );
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
