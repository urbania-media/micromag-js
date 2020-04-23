/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';

import * as MicromagPropTypes from '../../PropTypes';
import Label from './Label';

const propTypes = {
    href: PropTypes.string,
    external: PropTypes.bool,
    target: PropTypes.string,
    children: MicromagPropTypes.label,
    rel: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    href: '',
    external: false,
    target: '_blank',
    rel: 'noopener noreferrer',
    children: null,
    className: null,
};

const Link = ({ href, external, children, target, rel, className, ...props }) =>
    external ? (
        <a className={className} href={href} target={target} rel={rel} {...props}>
            <Label>{children}</Label>
        </a>
    ) : (
        <ReactLink className={className} to={href} {...props}>
            <Label>{children}</Label>
        </ReactLink>
    );

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
