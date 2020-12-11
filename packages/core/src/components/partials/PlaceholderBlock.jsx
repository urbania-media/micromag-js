import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../styles/partials/placeholder-block.module.scss';

const propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    outline: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: '100%',
    height: '3em',
    outline: false,
    className: null,
    children: null,
};

const PlaceholderBlock = ({ width, height, outline, className, children }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                    [styles.outline]: outline,
                },
            ])}
        >
            <div
                className={styles.box}
                style={{
                    width,
                    height,
                }}
            >
                {children}
            </div>
        </div>
    );
};

PlaceholderBlock.propTypes = propTypes;
PlaceholderBlock.defaultProps = defaultProps;

export default PlaceholderBlock;
