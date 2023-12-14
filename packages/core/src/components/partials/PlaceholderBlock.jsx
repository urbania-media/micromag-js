import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../styles/partials/placeholder-block.module.scss';

const propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    outline: PropTypes.bool,
    className: PropTypes.string,
    boxClassName: PropTypes.string,
    children: PropTypes.node,
    withInvertedColors: PropTypes.bool,
};

const defaultProps = {
    width: '100%',
    height: '3em',
    outline: false,
    className: null,
    boxClassName: null,
    children: null,
    withInvertedColors: true,
};

const PlaceholderBlock = ({
    width,
    height,
    outline,
    className,
    boxClassName,
    withInvertedColors,
    children,
}) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.outline]: outline,
                [styles.withInvertedColors]: withInvertedColors,
            },
        ])}
    >
        <div
            className={classNames([
                styles.box,
                {
                    [boxClassName]: boxClassName !== null,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            {children}
        </div>
    </div>
);

PlaceholderBlock.propTypes = propTypes;
PlaceholderBlock.defaultProps = defaultProps;

export default PlaceholderBlock;
