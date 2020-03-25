/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
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
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    reverse: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: PropTypes.shape({
        layout: MicromagPropTypes.gridLayout,
        spacing: PropTypes.number,
    }),
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    title: null,
    subtitle: null,
    description: null,
    isPlaceholder: false,
    isPreview: false,
    reverse: false,
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
    className: null,
};

const TitleGrid = ({
    background,
    title,
    subtitle,
    description,
    isPlaceholder,
    isPreview,
    reverse,
    groups,
    grid,
    textAlign,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { layout, spacing } = grid;

    const options = { title, subtitle, description };
    const blocks = groups.map(items => (
        <div className={styles.group} key={`group-${items.join('-')}`}>
            {items.map(name => {
                const key = `group-item-${name}`;
                const value = options[name] || null;

                if (isPlaceholder && value !== null) {
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

    const blockItems = reverse ? blocks.reverse() : blocks;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles.reverse]: reverse,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <div className={styles.inner}>
                <Grid
                    layout={layout}
                    spacing={spacing || 0}
                    items={blockItems}
                    className={styles.grid}
                />
            </div>
            <Background
                {...background}
                width={width}
                height={height}
                className={styles.background}
            />
        </div>
    );
};

TitleGrid.propTypes = propTypes;
TitleGrid.defaultProps = defaultProps;

export default TitleGrid;
