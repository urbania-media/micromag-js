/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { CloseIcon } from '@micromag/core/components';

import IconButton from './IconButton';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CloseButton = ({ className, ...props }) => {
    const intl = useIntl();
    return (
        <IconButton
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            label={intl.formatMessage({
                defaultMessage: 'Close',
                description: 'Button label with icon',
            })}
            icon={<CloseIcon />}
            {...props}
        />
    );
};

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
