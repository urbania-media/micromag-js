/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import { Button } from '@micromag/core/components';
import { getComponentFromName } from '@micromag/core/utils';

import * as DeviceIcons from '../icons/devices/index';

import styles from '../../styles/buttons/device.module.css';

interface DeviceButtonProps {
    device: string;
    iconComponents?: Record<string, Component>;
    className?: string;
}

function DeviceButton({ device, className = null, iconComponents = DeviceIcons, ...props }: DeviceButtonProps) {
    const DeviceIcon = getComponentFromName(device, iconComponents, DeviceIcons.Desktop);
    return (
        <Button
            className={classNames([
                styles.container,
                className,
            ])}
            {...props}
        >
            <DeviceIcon className={styles.icon} />
        </Button>
    );
}

export default DeviceButton;
