/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../styles/partials/preview-block.module.scss';

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

const PreviewBlock = ({ width, height, className, children }) => {
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
            {children}
        </div>
    );
};

PreviewBlock.propTypes = propTypes;
PreviewBlock.defaultProps = defaultProps;

export default PreviewBlock;
