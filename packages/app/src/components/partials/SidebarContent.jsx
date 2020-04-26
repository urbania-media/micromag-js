/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    sidebar: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    sidebar: null,
    children: null,
    className: null,
};

const SidebarContent = ({ sidebar, children, className }) => (
    <div
        className={classNames([
            'row',
            {
                [className]: className !== null,
            },
        ])}
    >
        <aside className="col-md-4 order-md-last">{sidebar}</aside>
        <div className="col-md-8">{children}</div>
    </div>
);

SidebarContent.propTypes = propTypes;
SidebarContent.defaultProps = defaultProps;

export default SidebarContent;
