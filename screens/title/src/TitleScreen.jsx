/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Grid from '@micromag/element-grid';
import Stack from '@micromag/element-stack';

import {
    PropTypes as MicromagPropTypes,
    PlaceholderTitle,
    PlaceholderText,
    PlaceholderSubtitle,
    Empty,
} from '@micromag/core';

import { getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const HEADING_SIZES = {
    title: { size: 1 },
    subtitle: { size: 2 },
};

const propTypes = {
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: MicromagPropTypes.gridElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    visible: PropTypes.bool,
    active: PropTypes.bool,
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
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TitleScreen = ({
    title,
    subtitle,
    description,
    groups,
    grid,
    background,
    box,
    textAlign,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const options = { title, subtitle, description };
    const hasValue = title !== null || subtitle !== null || description !== null;

    const items = groups.map((its) => (
        <div className={styles.group} key={`group-${its.join('-')}`}>
            {its.map((name) => {
                const key = `group-item-${name}`;
                const value = options[name] || null;

                if (isPlaceholder) {
                    if (name === 'subtitle') {
                        return <PlaceholderSubtitle className={styles.placeholder} key={key} />;
                    }
                    if (name === 'description') {
                        return <PlaceholderText className={styles.placeholder} key={key} />;
                    }
                    return <PlaceholderTitle className={styles.placeholder} key={key} />;
                }

                if (isEditor && !hasValue) {
                    return (
                        <Empty className={styles.empty}>
                            <FormattedMessage {...messages[name]} />
                        </Empty>
                    );
                }

                if (name === 'description') {
                    return <Text {...value} className={styles[name]} key={key} />;
                }
                const otherProps = HEADING_SIZES[name] || null;
                return <Heading {...otherProps} {...value} className={styles.title} key={key} />;
            })}
        </div>
    ));

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
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
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.grid} />
                    ) : (
                        <Stack {...box} className={styles.box}>
                            {items}
                        </Stack>
                    )}
                </Container>
            </div>
        </div>
    );
};

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default React.memo(TitleScreen);
