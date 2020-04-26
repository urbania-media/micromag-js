/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MainNavbar from '../navbars/Main';
import EditorNavbar from '../navbars/Editor';
import Footer from '../partials/Footer';

import styles from '../../styles/layouts/main.module.scss';

const propTypes = {
    children: PropTypes.node,
    contentAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    fullscreen: PropTypes.bool,
    isEditor: PropTypes.bool,
    withoutHeader: PropTypes.bool,
    withoutFooter: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    contentAlign: 'top',
    fullscreen: false,
    isEditor: false,
    withoutHeader: false,
    withoutFooter: false,
    className: null,
};

const MainLayout = ({
    children,
    contentAlign,
    fullscreen,
    isEditor,
    withoutHeader,
    withoutFooter,
    className,
}) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.fullscreen]: fullscreen || isEditor,
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
                {isEditor ? <EditorNavbar /> : <MainNavbar />}
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
            <footer
                className={classNames([
                    styles.header,
                    {
                        [styles.hidden]: withoutFooter || fullscreen || isEditor,
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
