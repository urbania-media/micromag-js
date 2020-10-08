/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Stack from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, PlaceholderPanorama } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

export const layouts = ['center'];

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
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isView, isEditor } = getRenderFormat(renderFormat);
    const content = 'Panorama';

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    <Stack isSmall={isSimple}>
                        {isPlaceholder ? (
                            <PlaceholderPanorama className={styles.placeholder} />
                        ) : (
                            content
                        )}
                    </Stack>
                </Container>
            </div>
        </div>
    );
};

PanoramaScreen.propTypes = propTypes;
PanoramaScreen.defaultProps = defaultProps;

export default React.memo(PanoramaScreen);
