/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    label: MicromagPropTypes.textElement,
    boxStyle: MicromagPropTypes.boxStyle,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
};

const defaultProps = {
    label: null,
    boxStyle: null,
    className: null,
    labelClassName: null,
};

function Badge({ label, boxStyle, className, labelClassName }) {
    const { textStyle = null } = label || {};
    const { lineHeight = null } = textStyle || {};

    let boxStyles = null;
    if (boxStyle !== null) {
        boxStyles = {
            ...boxStyles,
            ...getStyleFromBox(boxStyle),
        };
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={boxStyles}
        >
            <span
                className={classNames([
                    styles.label,
                    {
                        [labelClassName]: labelClassName !== null,
                    },
                ])}
            >
                <Text {...label} textStyle={{ ...textStyle, lineHeight: lineHeight || 1 }} inline />
            </span>
        </div>
    );
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
