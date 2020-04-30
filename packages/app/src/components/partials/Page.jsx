/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import PageHeader from './PageHeader';
import SidebarContent from './SidebarContent';

import styles from '../../styles/partials/page.module.scss';

const propTypes = {
    title: MicromagPropTypes.label,
    section: MicromagPropTypes.label,
    sidebar: PropTypes.node,
    children: PropTypes.node,
    small: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    section: null,
    sidebar: null,
    children: null,
    small: false,
    className: null,
};

const Page = ({ title, section, sidebar, children, small, className }) => (
    <div
        className={classNames([
            small ? 'container-small' : 'container-md',
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        <PageHeader title={title} section={section} />
        {sidebar !== null ? (
            <SidebarContent sidebar={sidebar}>{children}</SidebarContent>
        ) : (
            children
        )}
    </div>
);

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
