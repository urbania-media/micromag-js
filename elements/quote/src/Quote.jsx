/* eslint-disable react/no-array-index-key, react/no-danger */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { v1 as uuid } from 'uuid';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { LinkStyle, HighlightStyle } from '@micromag/core/components';
import {
    getStyleFromText,
    getStyleFromMargin,
    getStyleFromHighlight,
    getStyleFromLink,
} from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    body: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    linksStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
    emptyClassName: PropTypes.string,
};

const defaultProps = {
    body: null,
    textStyle: null,
    linksStyle: null,
    margin: null,
    showEmpty: false,
    className: null,
    emptyClassName: null,
};

const Quote = ({ body, textStyle, linksStyle, margin, showEmpty, className, emptyClassName }) => {
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

    const id = useMemo(
        () => (finalLinkStyle !== null ? `quote-component-${uuid()}` : null),
        [finalLinkStyle !== null],
    );

    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#${id}`} style={finalLinkStyle} />
            ) : null}
            {finalHighlightStyle !== null ? (
                <HighlightStyle selector={`#${id}`} style={finalHighlightStyle} />
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
Quote.defaultProps = defaultProps;

export default Quote;
