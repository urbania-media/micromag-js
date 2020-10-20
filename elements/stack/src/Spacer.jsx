import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useStackDirection } from './StackContext';

import styles from './styles/spacer.module.scss';

const propTypes = {
    size: PropTypes.number,
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    size: null,
    minSize: null,
    maxSize: null,
    className: null,
};

const Spacer = ({ size, minSize, maxSize, className }) => {
    const stackDirection = useStackDirection();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                width: stackDirection === 'horizontal' ? size : null,
                minWidth: stackDirection === 'horizontal' ? minSize : null,
                maxWidth: stackDirection === 'horizontal' ? maxSize : null,
                height: stackDirection === 'vertical' ? size : null,
                minHeight: stackDirection === 'vertical' ? minSize : null,
                maxHeight: stackDirection === 'vertical' ? maxSize : null,
            }}
        />
    );
};

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
