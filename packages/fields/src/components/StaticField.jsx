import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles/static-field.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    name: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    name: null,
    className: null,
};

const StaticField = ({ value, name, className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        {name === 'user' ? <div className={styles.icon} /> : null}
        <div className={styles.field}>{value !== null ? value : null}</div>
    </div>
);

StaticField.propTypes = propTypes;
StaticField.defaultProps = defaultProps;

export default StaticField;
