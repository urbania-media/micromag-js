/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromMargin } from '@micromag/core/utils';

import styles from './styles.module.scss';

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

const defaultProps = {
    url: null,
    target: null,
    rel: null,
    external: true,
    margin: null,
    className: null,
    children: null,
    focusable: true,
};

const Link = ({
    url,
    target: linkTarget,
    rel: linkRel,
    external,
    margin,
    className,
    children,
    focusable,
}) => {
    let finalStyle = null;

    if (margin !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromMargin(margin),
        };
    }

    const id = useMemo(() => (finalStyle !== null ? `link-component-${uuid()}` : null), [
        finalStyle !== null,
    ]);

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
Link.defaultProps = defaultProps;

export default Link;
