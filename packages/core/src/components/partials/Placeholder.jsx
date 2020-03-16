/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import classNames from 'classnames';

import styles from '../../styles/partials/placeholder.scss';

const propTypes = {
    lines: PropTypes.number,
    lineMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
};

const defaultProps = {
    lines: 1,
    lineMargin: null,
    height: null,
    className: null,
};

const Placeholder = ({ lines, lineMargin, height, className }) => {
    const lineHeight = height !== null && isNumber(height) ? `${height}rem` : height;
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
                height: lineHeight,
                marginBottom: index < lines - 1 ? margin : null,
            }}
        />
    ));
};

Placeholder.propTypes = propTypes;
Placeholder.defaultProps = defaultProps;

export default Placeholder;
