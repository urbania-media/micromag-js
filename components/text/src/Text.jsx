/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromFont, getStyleFromColor, getStyleFromMargin } from '@micromag/core/utils';
import { LinkStyle } from '@micromag/core/components';

import styles from './styles.module.scss';

const propTypes = {
    body: PropTypes.string,
    style: MicromagPropTypes.textStyle,
    className: PropTypes.string,
};

const defaultProps = {
    body: null,
    style: null,
    className: null,
};

const Text = ({ body, style, className }) => {
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
            <div
                id={id}
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

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
