/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    message: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    message: <FormattedMessage defaultMessage="Publish" description="Publish button label" />,
    children: null,
    className: null,
};

const PublishButton = ({ message, className, children, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            'btn-primary',
            {
                [className]: className !== null,
            },
        ])}
        icon={<FontAwesomeIcon icon={faArrowUp} color="currentColor" />}
        iconPosition="right"
        {...props}
    >
        {children || message}
    </Button>
);

PublishButton.propTypes = propTypes;
PublishButton.defaultProps = defaultProps;

export default PublishButton;
