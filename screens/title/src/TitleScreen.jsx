/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Screen from '@micromag/element-screen';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Grid from '@micromag/element-grid';
import Stack from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { getComponentFromName, getRenderFormat } from '@micromag/core/utils';
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
    const size = useScreenSize();
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);

    const options = { title, subtitle, description };
    const hasValue = title !== null || subtitle !== null || description !== null;

    const items = groups.map((its) => (
        <div className={styles.group} key={`group-${its.join('-')}`}>
            {its.map((name) => {
                const key = `group-item-${name}`;
                const value = options[name] || null;

                if (isPlaceholder) {
                    const Placeholder = getComponentFromName(name, Placeholders);
                    return <Placeholder className={styles.placeholder} key={key} />;
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
        <Screen
            size={size}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
            <div className={styles.inner}>
                {grid !== null ? (
                    <Grid {...grid} items={items} isSmall={isSimple} className={styles.grid} />
                ) : (
                    <Stack {...box} className={styles.box}>
                        {items}
                    </Stack>
                )}
            </div>
        </Screen>
    );
};

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default React.memo(TitleScreen);
