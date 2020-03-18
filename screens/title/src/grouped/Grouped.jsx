/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/component-background';
import Heading from '@micromag/component-heading';
import Text from '@micromag/component-text';
import { PropTypes as MicromagPropTypes, Placeholder } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './grouped.module.scss';

const HEADING_SIZES = {
    title: { size: 1 },
    subtitle: { size: 2 },
};

const PLACEHOLDER_SIZES = {
    title: { height: 1, lines: 1, lineMargin: 1 },
    subtitle: { height: 0.5, lines: 1 },
    description: { height: 0.2, lines: 4 },
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
    textAlign: 'center',
    className: null,
};

const Grouped = ({
    background,
    title,
    subtitle,
    description,
    isPlaceholder,
    isPreview,
    reverse,
    groups,
    textAlign,
    className,
}) => {
    const { width, height } = useScreenSize();
    const options = { title, subtitle, description };
    const blocks = groups.map(items => (
        <div key={`group-${items.join('-')}`} className={styles.group}>
            {items.map(name => {
                const key = `group-item-${name}`;
                const value = options[name] || null;

                if (isPlaceholder && value !== null) {
                    const props = PLACEHOLDER_SIZES[name] || null;
                    return <Placeholder {...props} className={styles[name]} key={key} />;
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
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles.reverse]: reverse,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <div className={styles.inner}>{blocks}</div>
            <Background
                {...background}
                width={width}
                height={height}
                className={styles.background}
            />
        </div>
    );
};

Grouped.propTypes = propTypes;
Grouped.defaultProps = defaultProps;

export default Grouped;
