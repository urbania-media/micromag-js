/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
// import Image from '@micromag/element-image';

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
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const content = 'Panorama';

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [styles.isPreview]: renderFormat === 'preview',
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={isView || (isEditor && active)}
                className={styles.background}
            >
                <Frame className={styles.frame} width={width} height={height} visible={visible}>
                    <Box withSmallSpacing={isSimple}>
                        {isPlaceholder ? (
                            <Placeholders.Panorama className={styles.placeholder} />
                        ) : (
                            content
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

PanoramaScreen.propTypes = propTypes;
PanoramaScreen.defaultProps = defaultProps;

export default React.memo(PanoramaScreen);
