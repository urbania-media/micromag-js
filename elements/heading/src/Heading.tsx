/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { useId } from 'react';

import type { Margin, TextStyle } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import {
    addNonBreakingSpaces,
    getStyleFromHighlight,
    getStyleFromLink,
    getStyleFromMargin,
    getStyleFromText,
} from '@micromag/core/utils';

import styles from './styles.module.css';

interface HeadingProps {
    size?: 1 | 2 | 3 | 4 | 5 | 6;
    body?: string | null;
    textStyle?: TextStyle | null;
    linksStyle?: TextStyle | null;
    margin?: Margin | null;
    withoutNonBreakingSpaces?: boolean;
    className?: string | null;
    headingRef?: Record<string, unknown> | null;
}

function Heading({
    size = 1,
    body = null,
    textStyle = null,
    linksStyle = null,
    margin = null,
    withoutNonBreakingSpaces = false,
    className = null,
    headingRef = null,
}: HeadingProps) {
    const HeadingComponent = `h${size}`;
    const { link: linkStyle = null, highlight: highlightStyle = null } = textStyle || {};
    let finalStyle = null;
    let finalLinkStyle = linkStyle !== null ? getStyleFromLink(linkStyle) : null;
    const finalHighlightStyle =
        highlightStyle !== null ? getStyleFromHighlight(highlightStyle) : null;
    if (textStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromText(textStyle),
        };
    }
    if (margin !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromMargin(margin),
        };
    }
    if (linksStyle !== null) {
        finalLinkStyle = {
            ...finalLinkStyle,
            ...getStyleFromText(linksStyle),
        };
    }

    const needsId = finalLinkStyle !== null || highlightStyle !== null;
    const uniqueId = useId();
    const id = needsId ? `heading-component-${uniqueId}` : null;

    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#${CSS.escape(id)}`} style={finalLinkStyle} />
            ) : null}
            {finalHighlightStyle !== null ? (
                <HighlightStyle selector={`#${CSS.escape(id)}`} style={finalHighlightStyle} />
            ) : null}
            <HeadingComponent
                id={id}
                className={classNames([styles.container, className])}
                style={finalStyle}
                dangerouslySetInnerHTML={{
                    __html: !withoutNonBreakingSpaces ? addNonBreakingSpaces(body) : body,
                }}
                ref={headingRef}
            />
        </>
    );
}

// eslint-disable-next-line react/jsx-props-no-spreading
export default React.forwardRef((props, ref) => <Heading headingRef={ref} {...props} />);
