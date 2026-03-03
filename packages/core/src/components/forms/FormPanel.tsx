/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';

import Card from '../partials/Card';
import Spinner from '../partials/Spinner';

import styles from '../../styles/forms/form-panel.module.css';

interface FormPanelProps {
    description?: React.ReactNode;
    loading?: boolean;
    children?: React.ReactNode;
    className?: string;
}

function FormPanel(
    { description = null, loading = false, children = null, className = null, ...props },
) {
    return (
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
}

export default FormPanel;
