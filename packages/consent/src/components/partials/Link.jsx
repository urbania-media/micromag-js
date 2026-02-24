/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback, useInsertionEffect, useRef } from 'react';

export const useEvent = (fn) => {
    const ref = useRef([fn, (...args) => ref[0](...args)]).current;
    // Per Dan Abramov: useInsertionEffect executes marginally closer to the
    // correct timing for ref synchronization than useLayoutEffect on React 18.
    // See: https://github.com/facebook/react/pull/25881#issuecomment-1356244360
    useInsertionEffect(() => {
        ref[0] = fn;
    });
    return ref[1];
};

const propTypes = {
    href: PropTypes.string,
    route: PropTypes.string,
    routeParams: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    external: PropTypes.bool,
    target: PropTypes.string,
    children: PropTypes.node,
    rel: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

const LinkPartial = ({
    href = null,
    route = null,
    routeParams = null,
    external = false,
    children = null,
    target = '_blank',
    rel = 'noopener noreferrer',
    onClick = null,
    className = null,
    ...props
}) => {
    const link = href || null;
    if (link === null) {
        return <span className={className}>{children}</span>;
    }

    const onClickLink = useCallback(
        (...args) => {
            if (onClick !== null) {
                onClick(...args);
            }
        },
        [onClick],
    );

    const handleClick = useEvent((event) => {
        // ignores the navigation when clicked using right mouse button or
        // by holding a special modifier key: ctrl, command, win, alt, shift
        if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            event.shiftKey ||
            event.button !== 0
        ) {
            return;
        }

        if (onClickLink !== null) {
            onClickLink(event);
        }

        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    });

    return external ? (
        <a
            className={className}
            href={href}
            target={target}
            rel={rel}
            onClick={onClickLink}
            {...props}
        >
            {children}
        </a>
    ) : (
        <a className={className} href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};

LinkPartial.propTypes = propTypes;

export default LinkPartial;
