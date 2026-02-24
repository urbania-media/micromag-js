/* eslint-disable react/no-array-index-key, react/no-danger */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useId } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import {
    getStyleFromHighlight,
    getStyleFromLink,
    getStyleFromMargin,
    getStyleFromText,
} from '@micromag/core/utils';

import styles from './styles.module.css';

const propTypes = {
    body: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    linksStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
    emptyClassName: PropTypes.string,
};

const Quote = ({ body = null, textStyle = null, linksStyle = null, margin = null, showEmpty = false, className = null, emptyClassName = null }) => {
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
                    {
                        [styles.showEmpty]: showEmpty,
                        [emptyClassName]: showEmpty && emptyClassName !== null,
                        [className]: className !== null,
                    },
                ])}
                style={finalStyle}
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </>
    );
};

Quote.propTypes = propTypes;

export default Quote;
