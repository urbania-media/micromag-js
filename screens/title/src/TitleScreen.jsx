/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Heading from '@micromag/component-heading';
import Text from '@micromag/component-text';
import Grid from '@micromag/component-grid';
import Box from '@micromag/component-box';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const HEADING_SIZES = {
    title: { size: 1 },
    subtitle: { size: 2 },
};

const propTypes = {
    title: MicromagPropTypes.headingComponent,
    subtitle: MicromagPropTypes.headingComponent,
    description: MicromagPropTypes.textComponent,
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: MicromagPropTypes.gridComponent,
    box: MicromagPropTypes.boxComponent,
    background: MicromagPropTypes.backgroundComponent,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    subtitle: null,
    description: null,
    groups: [['title', 'subtitle'], ['description']],
    grid: null,
    box: null,
    background: null,
    textAlign: 'center',
    renderFormat: 'view',
    className: null,
};

const TitleScreen = ({
    title,
    subtitle,
    description,
    groups,
    grid,
    box,
    background,
    textAlign,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const options = { title, subtitle, description };
    const items = groups.map(its => (
        <div className={styles.group} key={`group-${its.join('-')}`}>
            {its.map(name => {
                const key = `group-item-${name}`;
                const value = options[name] || null;

                if (isSimple) {
                    const Placeholder = getComponentFromName(name, Placeholders);
                    return <Placeholder className={styles.placeholder} key={key} />;
                }

                if (name === 'description') {
                    return <Text {...value} className={styles[name]} key={key} />;
                }
                const props = HEADING_SIZES[name] || null;
                return <Heading {...props} {...value} className={styles.title} key={key} />;
            })}
        </div>
    ));

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <div className={styles.inner}>
                        {grid !== null ? (
                            <Grid
                                {...grid}
                                items={items}
                                withSmallSpacing={isSimple}
                                className={styles.grid}
                            />
                        ) : (
                            <Box {...box} className={styles.box}>
                                {items}
                            </Box>
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default TitleScreen;
