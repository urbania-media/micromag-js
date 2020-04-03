/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../styles/partials/placeholder-block.module.scss';

const propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: '50%',
    height: '50%',
    className: null,
    children: null,
};

const PlaceholderBlock = ({ width, height, className, children }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            <div className={styles.box}>{children}</div>
        </div>
    );
};

PlaceholderBlock.propTypes = propTypes;
PlaceholderBlock.defaultProps = defaultProps;

export default PlaceholderBlock;
