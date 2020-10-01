/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import classNames from 'classnames';

import styles from '../../styles/partials/placeholder.module.scss';

const propTypes = {
    lines: PropTypes.number,
    lineMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    baseSize: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    lines: 1,
    lineMargin: null,
    width: '3em',
    height: null,
    baseSize: 16,
    className: null,
};

const Placeholder = ({ lines, lineMargin, width, height, baseSize, className }) => {
    const lineHeight =
        height !== null && isNumber(height) ? `${Math.round(height * baseSize)}px` : height;
    const margin = lineMargin !== null && isNumber(lineMargin) ? `${lineMargin}em` : lineMargin;
    return [...Array(lines)].map((e, index) => (
        <div
            key={`line-${index}`}
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
            style={{
                width,
                height: lineHeight,
                marginBottom: index < lines - 1 ? margin : null,
            }}
        />
    ));
};

Placeholder.propTypes = propTypes;
Placeholder.defaultProps = defaultProps;

export default Placeholder;
