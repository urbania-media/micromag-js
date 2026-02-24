/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/no-array-index-key, react/no-danger */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useId } from 'react';

// import { v4 as uuid } from 'uuid';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import {
    getStyleFromBox,
    getStyleFromHighlight,
    getStyleFromLink,
    getStyleFromMargin,
    getStyleFromText,
} from '@micromag/core/utils';

import styles from './styles.module.css';

const propTypes = {
    body: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    boxStyle: MicromagPropTypes.boxStyle,
    linksStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    lineClamp: PropTypes.number,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
    emptyClassName: PropTypes.string,
    inline: PropTypes.bool,
    refText: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
};

const Text = ({
    body = null,
    textStyle = null,
    boxStyle = null,
    linksStyle = null,
    margin = null,
    lineClamp = null,
    showEmpty = false,
    className = null,
    emptyClassName = null,
    inline = false,
    refText = null,
}) => {
    const { link: linkStyle = null, highlight: highlightStyle = null } = textStyle || {};
    let finalStyle = {};
    let finalLinkStyle = linkStyle !== null ? getStyleFromLink(linkStyle) : null;

    const finalHighlightStyle =
        highlightStyle !== null ? getStyleFromHighlight(highlightStyle) : null;

    // if (highlightStyle !== null) {
    //     console.log('highlightStyle', highlightStyle);
    // }

    if (textStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromText(textStyle),
        };
    }

    if (boxStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromBox(boxStyle),
        };
    }

    if (lineClamp !== null) {
        finalStyle.WebkitLineClamp = lineClamp;
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
    const id = needsId ? `text-component-${uniqueId}` : null;

    const tagProps = {
        id,
        className: classNames([
            styles.container,
            {
                [styles.withLineClamp]: lineClamp !== null,
                [styles.showEmpty]: showEmpty,
                [emptyClassName]: showEmpty && emptyClassName !== null,
                [className]: className !== null,
            },
        ]),
        style: finalStyle,
        dangerouslySetInnerHTML: { __html: body },
        ref: refText,
    };

    const Tag = `${inline ? 'span' : 'div'}`;

    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#${CSS.escape(id)}`} style={finalLinkStyle} />
            ) : null}
            {finalHighlightStyle !== null ? (
                <HighlightStyle selector={`#${CSS.escape(id)}`} style={finalHighlightStyle} />
            ) : null}
            <Tag {...tagProps} />
        </>
    );
};

Text.propTypes = propTypes;

export default Text;
