/* eslint-disable react/no-array-index-key, react/no-danger */
import classNames from 'classnames';
import React, { useId } from 'react';

import type { Margin, TextStyle } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import {
    getStyleFromHighlight,
    getStyleFromLink,
    getStyleFromMargin,
    getStyleFromText,
} from '@micromag/core/utils';

import styles from './styles.module.css';

interface QuoteProps {
    body?: string | null;
    textStyle?: TextStyle | null;
    linksStyle?: TextStyle | null;
    margin?: Margin | null;
    showEmpty?: boolean;
    className?: string | null;
    emptyClassName?: string | null;
}

function Quote({
    body = null,
    textStyle = null,
    linksStyle = null,
    margin = null,
    showEmpty = false,
    className = null,
    emptyClassName = null,
}: QuoteProps) {
    const { link: linkStyle = null, highlight: highlightStyle = null } = textStyle || {};
    let finalStyle = {};
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

    const uniqueId = useId();
    const id = finalLinkStyle !== null ? `quote-component-${uniqueId}` : null;

    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#${CSS.escape(id)}`} style={finalLinkStyle} />
            ) : null}
            {finalHighlightStyle !== null ? (
                <HighlightStyle selector={`#${CSS.escape(id)}`} style={finalHighlightStyle} />
            ) : null}
            <blockquote
                id={id}
                className={classNames([
                    styles.container,
                    className,
                    {
                        [styles.showEmpty]: showEmpty,
                        [emptyClassName]: showEmpty && emptyClassName !== null,
                    },
                ])}
                style={finalStyle}
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </>
    );
}

export default Quote;
