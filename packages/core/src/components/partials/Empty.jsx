/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';
import Label from './Label';

import styles from '../../styles/partials/empty.module.scss';

const propTypes = {
    children: PropTypes.node,
    withoutBorder: PropTypes.bool,
    invertColor: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    withoutBorder: false,
    invertColor: false,
    className: null,
};

const Empty = ({ children, withoutBorder, invertColor, className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [styles.withoutBorder]: withoutBorder,
                [styles.invertColor]: invertColor,
                [className]: className,
            },
        ])}
    >
        <div className={styles.middle}>
            <Label>{children}</Label>
        </div>
    </div>
);

Empty.propTypes = propTypes;
Empty.defaultProps = defaultProps;

export default Empty;
