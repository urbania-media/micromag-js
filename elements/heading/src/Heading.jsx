/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { LinkStyle } from '@micromag/core/components';
import { getStyleFromText, getStyleFromMargin } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    body: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    linksStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    className: PropTypes.string,
};

const defaultProps = {
    size: 1,
    body: null,
    textStyle: null,
    linksStyle: null,
    margin: null,
    className: null,
};

const Heading = ({ size, body, textStyle, linksStyle, margin, className }) => {
    const HeadingComponent = `h${size}`;
    let finalStyle = null;
    let finalLinkStyle = null;
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
