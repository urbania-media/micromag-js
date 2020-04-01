/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { Button } from '@micromag/core/components';

import * as DeviceIcons from '../icons/devices/index';

import styles from '../../styles/buttons/device.module.scss';

const propTypes = {
    device: PropTypes.string.isRequired,
    iconComponents: MicromagPropTypes.components,
    className: PropTypes.string,
};

const defaultProps = {
    iconComponents: DeviceIcons,
    className: null,
};

const DeviceButton = ({ device, className, iconComponents, ...props }) => {
    const DeviceIcon = getComponentFromName(device, iconComponents, DeviceIcons.Desktop);
    return (
        <Button
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            {...props}
        >
            <DeviceIcon className={styles.icon} />
        </Button>
    );
};

DeviceButton.propTypes = propTypes;
DeviceButton.defaultProps = defaultProps;

export default DeviceButton;
