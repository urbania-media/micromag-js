/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/component-box';
import Grid from '@micromag/component-grid';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import { useScreenSize } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    text: MicromagPropTypes.text,
    box: MicromagPropTypes.box,
    grid: MicromagPropTypes.box,
    image: MicromagPropTypes.image,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    text: null,
    image: null,
    box: null,
    grid: null,
    textAlign: 'center',
    isPlaceholder: false,
    isPreview: true,
    className: null,
};

const TextScreen = ({ background, box, grid, textAlign, isPlaceholder, isPreview, className }) => {
    const { width, height } = useScreenSize();
    // const items = fields.map(field => (
    //     <FieldComponent
    //         name={field}
    //         props={otherProps[field]}
    //         className={styles[field]}
    //         placeholderClassName={styles.placeholder}
    //         isPlaceholder={isPlaceholder}
    //     />
    // ));

    const items = [];

    // const item = isPlaceholder ? (
    //     <Placeholders.Text height={0.5} lines={4} className={styles.placeholder} />
    // ) : (
    //     <Text {...text} className={styles.text} />
    // );

    return (
        <Background {...background} width={width} height={height}>
            <Frame width={width} height={height}>
                <div
                    className={classNames([
                        styles.container,
                        {
                            [styles.isPlaceholder]: isPlaceholder,
                            [styles.isPreview]: isPreview,
                            [styles[textAlign]]: textAlign !== null,
                            [className]: className !== null,
                        },
                    ])}
                >
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.box} />
                    ) : (
                        <Box {...box} items={items} className={styles.box} />
                    )}
                </div>
            </Frame>
        </Background>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default TextScreen;
