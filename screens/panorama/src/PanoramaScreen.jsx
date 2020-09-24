/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Screen from '@micromag/element-screen';
import Stack from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    panorama: PropTypes.object, // eslint-disable-line
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    panorama: {
        width: null,
        height: null,
        image: null,
    },
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const PanoramaScreen = ({ background, visible, active, renderFormat, className }) => {
    const size = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);
    const content = 'Panorama';

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <Screen
            size={size}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
            <Stack isSmall={isSimple}>
                {isPlaceholder ? <Placeholders.Panorama className={styles.placeholder} /> : content}
            </Stack>
        </Screen>
    );
};

PanoramaScreen.propTypes = propTypes;
PanoramaScreen.defaultProps = defaultProps;

export default React.memo(PanoramaScreen);
