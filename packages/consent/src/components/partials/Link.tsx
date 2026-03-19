/* eslint-disable react/jsx-props-no-spreading */
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

interface LinkPartialProps {
    href?: string;
    route?: string;
    routeParams?: Record<string, unknown>;
    external?: boolean;
    target?: string;
    children?: React.ReactNode;
    rel?: string;
    onClick?: (...args: unknown[]) => void;
    className?: string;
}

function LinkPartial({
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
}: LinkPartialProps) {
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
}

export default LinkPartial;
