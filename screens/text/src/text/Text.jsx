/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field as FieldComponent } from '@micromag/component-field';
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
    fields: MicromagPropTypes.fieldTypes,
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
    fields: ['text', 'image'],
    className: null,
};

const TextScreen = ({
    background,
    box,
    grid,
    textAlign,
    isPlaceholder,
    isPreview,
    fields,
    className,
    ...otherProps
}) => {
    const { width, height } = useScreenSize();
    const items = fields.map(field => (
        <FieldComponent
            name={field}
            props={otherProps[field]}
            className={styles[field]}
            placeholderClassName={styles.placeholder}
            isPlaceholder={isPlaceholder}
        />
    ));
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
