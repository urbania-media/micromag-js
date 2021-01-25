import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const direction = useStackDirection();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.hasSize]: size !== null,
                    [className]: className !== null,
                },
            ])}
            style={{
                width: direction === 'horizontal' ? size : null,
                minWidth: direction === 'horizontal' ? minSize : null,
                maxWidth: direction === 'horizontal' ? maxSize : null,
                height: direction === 'vertical' ? size : null,
                minHeight: direction === 'vertical' ? minSize : null,
                maxHeight: direction === 'vertical' ? maxSize : null,
            }}
        />
    );
};

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
