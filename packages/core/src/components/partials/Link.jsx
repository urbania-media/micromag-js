/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as ReactLink } from 'wouter';

import { PropTypes as MicromagPropTypes } from '../../lib';

import Label from './Label';

import styles from '../../styles/partials/link.module.css';

const propTypes = {
    href: PropTypes.string,
    external: PropTypes.bool,
    target: PropTypes.string,
    children: MicromagPropTypes.label,
    rel: PropTypes.string,
    withoutStyle: PropTypes.bool,
    className: PropTypes.string,
};

const Link = ({ href = '', external = false, children = null, target = '_blank', rel = 'noopener noreferrer', className = null, withoutStyle = false, ...props }) =>
    external ? (
        <a
            className={classNames([className, { [styles.withoutStyle]: withoutStyle }])}
            href={href}
            target={target}
            rel={rel}
            {...props}
        >
            <Label>{children}</Label>
        </a>
    ) : (
        <ReactLink
            className={classNames([className, { [styles.withoutStyle]: withoutStyle }])}
            href={href}
            {...props}
        >
            <Label>{children}</Label>
        </ReactLink>
    );

Link.propTypes = propTypes;

export default Link;
