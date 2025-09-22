/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useId } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import {
    addNonBreakingSpaces,
    getStyleFromHighlight,
    getStyleFromLink,
    getStyleFromMargin,
    getStyleFromText,
} from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    body: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    linksStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    withoutNonBreakingSpaces: PropTypes.bool,
    className: PropTypes.string,
    headingRef: PropTypes.shape({}),
};

const defaultProps = {
    size: 1,
    body: null,
    textStyle: null,
    linksStyle: null,
    margin: null,
    withoutNonBreakingSpaces: false,
    className: null,
    headingRef: null,
};

const Heading = ({
    size,
    body,
    textStyle,
    linksStyle,
    margin,
    withoutNonBreakingSpaces,
    className,
    headingRef,
}) => {
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
    const id = useId();
    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#text-component-${id}`} style={finalLinkStyle} />
            ) : null}
            {finalHighlightStyle !== null ? (
                <HighlightStyle selector={`#text-component-${id}`} style={finalHighlightStyle} />
            ) : null}
            <HeadingComponent
                id={needsId ? `text-component-${id}` : null}
                className={classNames([styles.container, className])}
                style={finalStyle}
                dangerouslySetInnerHTML={{
                    __html: !withoutNonBreakingSpaces ? addNonBreakingSpaces(body) : body,
                }}
                ref={headingRef}
            />
        </>
    );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

// eslint-disable-next-line react/jsx-props-no-spreading
export default React.forwardRef((props, ref) => <Heading headingRef={ref} {...props} />);
