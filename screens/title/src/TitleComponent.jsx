/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Heading from '@micromag/component-heading';
import Text from '@micromag/component-text';
import Grid from '@micromag/component-grid';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { getComponentFromName } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const HEADING_SIZES = {
    title: { size: 1 },
    subtitle: { size: 2 },
};

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    title: MicromagPropTypes.headingComponent,
    subtitle: MicromagPropTypes.headingComponent,
    description: MicromagPropTypes.textComponent,
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    title: null,
    subtitle: null,
    description: null,
    groups: [['title', 'subtitle'], ['description']],
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
        spacing: 2,
    },
    textAlign: 'center',
    renderFormat: 'view',
    className: null,
};

const TitleComponent = ({
    background,
    title,
    subtitle,
    description,
    groups,
    grid,
    textAlign,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { layout, spacing } = grid;
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    const options = { title, subtitle, description };
    const blocks = groups.map(items => (
        <div className={styles.group} key={`group-${items.join('-')}`}>
            {items.map(name => {
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
                        <Grid
                            layout={layout}
                            spacing={spacing || 0}
                            items={blocks}
                            withSmallSpacing={isSimple}
                            className={styles.grid}
                        />
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TitleComponent.propTypes = propTypes;
TitleComponent.defaultProps = defaultProps;

export default TitleComponent;
