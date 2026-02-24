/* eslint-disable react/no-array-index-key, react/no-danger */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useId } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromMargin } from '@micromag/core/utils';

import styles from './styles.module.css';

const propTypes = {
    url: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    external: PropTypes.bool,
    margin: MicromagPropTypes.margin,
    className: PropTypes.string,
    children: PropTypes.node,
    focusable: PropTypes.bool,
};

const Link = ({
    url = null,
    target: linkTarget = null,
    rel: linkRel = null,
    external = true,
    margin = null,
    className = null,
    children = null,
    focusable = true,
}) => {
    let finalStyle = null;

    if (margin !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromMargin(margin),
        };
    }

    const uniqueId = useId();
    const id = finalStyle !== null ? `link-component-${uniqueId}` : null;

    const { target, rel } = external
        ? { target: '_blank', rel: 'noopener noreferer' }
        : { target: linkTarget, rel: linkRel };

    return url ? (
        <a
            id={id}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
            href={url}
            target={target}
            rel={rel}
            tabIndex={focusable ? '0' : '-1'}
        >
            {children}
        </a>
    ) : (
        <div
            id={id}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {children}
        </div>
    );
};

Link.propTypes = propTypes;

export default Link;
