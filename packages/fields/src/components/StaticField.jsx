import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles/static-field.module.css';

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    name: PropTypes.string,
    className: PropTypes.string,
};

const StaticField = ({ value = null, name = null, className = null }) => (
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

export default StaticField;
