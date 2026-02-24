/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../partials/Card';
import Spinner from '../partials/Spinner';

import styles from '../../styles/forms/form-panel.module.css';

const propTypes = {
    description: PropTypes.node,
    loading: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

const FormPanel = ({ description = null, loading = false, children = null, className = null, ...props }) => (
    <Card
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        {...props}
    >
        {description}
        {loading ? <Spinner /> : children}
    </Card>
);

FormPanel.propTypes = propTypes;

export default FormPanel;
