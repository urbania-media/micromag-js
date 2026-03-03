/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { Link as ReactLink } from 'wouter';

import Label from './Label';

import styles from '../../styles/partials/link.module.css';

interface LinkProps {
    href?: string;
    external?: boolean;
    target?: string;
    children?: Label | null;
    rel?: string;
    withoutStyle?: boolean;
    className?: string | null;
}

function Link({
    href = '',
    external = false,
    children = null,
    target = '_blank',
    rel = 'noopener noreferrer',
    className = null,
    withoutStyle = false,
    ...props
}: LinkProps) {
    return external ? (
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
}

export default Link;
