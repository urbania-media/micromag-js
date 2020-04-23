/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../partials/Card';

import styles from '../../styles/forms/form-panel.module.scss';

const propTypes = {
    description: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    description: null,
    children: null,
    className: null,
};

const FormPanel = ({ description, children, className, ...props }) => (
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
        {children}
    </Card>
);

FormPanel.propTypes = propTypes;
FormPanel.defaultProps = defaultProps;

export default FormPanel;
