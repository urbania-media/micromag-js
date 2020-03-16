/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { LinkStyle } from '@micromag/core/components';
import { getStyleFromFont, getStyleFromColor, getStyleFromMargin } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    body: PropTypes.string,
    style: PropTypes.shape({
        text: MicromagPropTypes.textStyle,
        links: MicromagPropTypes.textStyle,
    }),
    className: PropTypes.string,
};

const defaultProps = {
    size: 1,
    body: null,
    style: null,
    className: null,
};

const Heading = ({ size, body, style, className }) => {
    const HeadingComponent = `h${size}`;
    let finalStyle = null;
    let finalLinkStyle = null;
    const { text: textStyle = null, links: linksStyle = null, margin = null } = style || {};
    if (textStyle !== null) {
        const { font = null, color = null } = textStyle;
        finalStyle = {
            ...finalStyle,
            ...getStyleFromFont(font),
            ...getStyleFromColor(color, 'color'),
        };
    }
    if (margin !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromMargin(margin),
        };
    }
    if (linksStyle !== null) {
        const { font = null, color = null } = linksStyle;
        finalLinkStyle = {
            ...finalLinkStyle,
            ...getStyleFromFont(font),
            ...getStyleFromColor(color, 'color'),
        };
    }
    const id = useMemo(() => (finalLinkStyle !== null ? `text-component-${uuid()}` : null), [
        finalLinkStyle !== null,
    ]);
    return (
        <>
            {finalLinkStyle !== null ? (
                <LinkStyle selector={`#${id}`} style={finalLinkStyle} />
            ) : null}
            <HeadingComponent
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
                style={finalStyle}
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </>
    );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
