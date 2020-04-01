/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../../styles/partials/empty.module.scss';

const propTypes = {
    children: PropTypes.node,
    withoutBorder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    withoutBorder: false,
    className: null,
};

const Placeholder = ({ children, withoutBorder, className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [styles.withoutBorder]: withoutBorder,
                [className]: className,
            },
        ])}
    >
        <div className={styles.middle}>{children}</div>
    </div>
);

Placeholder.propTypes = propTypes;
Placeholder.defaultProps = defaultProps;

export default Placeholder;
