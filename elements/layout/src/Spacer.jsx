import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import { useLayoutDirection } from './LayoutContext';

import styles from './styles/spacer.module.scss';

const propTypes = {
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    minSize: null,
    maxSize: null,
    className: null,
};

const Spacer = ({ minSize, maxSize, className }) => {
    const layoutDirection = useLayoutDirection();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{
                minWidth: layoutDirection === 'horizontal' ? minSize : null,
                minHeight: layoutDirection === 'vertical' ? minSize : null,
                maxWidth: layoutDirection === 'horizontal' ? maxSize : null,
                maxHeight: layoutDirection === 'vertical' ? maxSize : null,
            }}
        />
    );
};

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
