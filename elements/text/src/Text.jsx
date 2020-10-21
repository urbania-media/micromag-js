/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromText, getStyleFromMargin } from '@micromag/core/utils';
import { LinkStyle } from '@micromag/core/components';

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

const Text = ({ body, textStyle, linksStyle, margin, showEmpty, className, emptyClassName }) => {
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
            <div
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

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
