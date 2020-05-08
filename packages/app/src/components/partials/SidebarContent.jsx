/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    sidebar: PropTypes.node,
    children: PropTypes.node,
    sidebarFirstOnMobile: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    sidebar: null,
    children: null,
    sidebarFirstOnMobile: false,
    className: null,
};

const SidebarContent = ({ sidebar, sidebarFirstOnMobile, children, className }) => (
    <div
        className={classNames([
            'row',
            {
                [className]: className !== null,
            },
        ])}
    >
        <div className="col-md-8">{children}</div>
        <aside
            className={classNames([
                'col-md-4',
                {
                    'order-sm-first': sidebarFirstOnMobile,
                    'mb-4': sidebarFirstOnMobile,
                    'mt-4': !sidebarFirstOnMobile,
                    'mb-md-0': sidebarFirstOnMobile,
                    'mt-md-0': !sidebarFirstOnMobile,
                },
            ])}
        >
            {sidebar}
        </aside>
    </div>
);

SidebarContent.propTypes = propTypes;
SidebarContent.defaultProps = defaultProps;

export default SidebarContent;
