/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key, react/no-danger */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import {
    getStyleFromHighlight,
    getStyleFromLink,
    getStyleFromMargin,
    getStyleFromText,
} from '@micromag/core/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { v1 as uuid } from 'uuid';
import styles from './styles.module.scss';

const propTypes = {
    body: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    linksStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    lineClamp: PropTypes.number,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
    emptyClassName: PropTypes.string,
    inline: PropTypes.bool,
};

const defaultProps = {
    body: null,
    textStyle: null,
    linksStyle: null,
    margin: null,
    lineClamp: null,
    showEmpty: false,
    className: null,
    emptyClassName: null,
    inline: false,
};

const Text = ({
    body,
    textStyle,
    linksStyle,
    margin,
    lineClamp,
    showEmpty,
    className,
    emptyClassName,
    inline,
}) => {
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
    const id = useMemo(() => (needsId ? `text-component-${uuid()}` : null), [needsId]);

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
    };

    const Tag = `${inline ? 'span' : 'div'}`;

    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#${id}`} style={finalLinkStyle} />
            ) : null}
            {finalHighlightStyle !== null ? (
                <HighlightStyle selector={`#${id}`} style={finalHighlightStyle} />
            ) : null}
            <Tag {...tagProps} />
        </>
    );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
