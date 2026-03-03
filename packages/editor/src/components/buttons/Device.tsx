/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { getComponentFromName } from '@micromag/core/utils';
import { Button } from '@micromag/core/components';

import * as DeviceIcons from '../icons/devices/index';

import styles from '../../styles/buttons/device.module.css';

interface DeviceButtonProps {
    device: string;
    iconComponents?: Record<string, Component>;
    className?: string;
}

function DeviceButton({ device, className = null, iconComponents = DeviceIcons, ...props }) {
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
}

export default DeviceButton;
