import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';

import { openShareWindow } from './shareLinks';

interface ShareButtonProps {
    link: string;
    /** Size of the share dialog, or null to open the link in the page (ex.: mailto:) */
    windowSize?: { width: number; height: number } | null;
    className?: string | null;
    style?: CSSProperties | null;
    focusable?: boolean;
    onClick?: (() => void) | null;
    onWindowClose?: (() => void) | null;
    children?: ReactNode;
}

// The reset style of the buttons of react-share
const resetStyle: CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    display: 'inline-flex',
    outlineOffset: 2,
    font: 'inherit',
    color: 'inherit',
    cursor: 'pointer',
};

function ShareButton({
    link,
    windowSize = { width: 550, height: 400 },
    className = null,
    style = null,
    focusable = true,
    onClick = null,
    onWindowClose = null,
    children = null,
}: ShareButtonProps) {
    return (
        <button
            type="button"
            className={classNames(['react-share__ShareButton', className])}
            style={{ ...resetStyle, ...style }}
            tabIndex={focusable ? undefined : -1}
            onClick={(event) => {
                event.preventDefault();
                if (onClick !== null) {
                    onClick();
                }
                if (windowSize !== null) {
                    openShareWindow(link, windowSize, onWindowClose);
                } else {
                    window.location.href = link;
                }
            }}
        >
            {children}
        </button>
    );
}

export default ShareButton;
