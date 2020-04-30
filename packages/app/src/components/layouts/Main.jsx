/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MainNavbar from '../navbars/Main';

import styles from '../../styles/layouts/main.module.scss';

const propTypes = {
    navbar: PropTypes.node,
    children: PropTypes.node,
    contentAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    fullscreen: PropTypes.bool,
    isEditor: PropTypes.bool,
    withoutHeader: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    navbar: null,
    children: null,
    contentAlign: 'top',
    fullscreen: false,
    isEditor: false,
    withoutHeader: false,
    className: null,
};

const MainLayout = ({
    navbar,
    children,
    contentAlign,
    fullscreen,
    isEditor,
    withoutHeader,
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
                {navbar !== null ? navbar : <MainNavbar />}
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
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
