/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

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

export const layouts = [    
    'center',
    'top',
    'bottom',
    'around',
    'between'
];

const HEADING_SIZES = {
    title: { size: 1 },
    subtitle: { size: 2 },
};

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    groups: PropTypes.arrayOf(PropTypes.array),
    background: MicromagPropTypes.backgroundElement,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    title: null,
    subtitle: null,
    description: null,
    groups: [['title', 'subtitle'], ['description']],
    background: null,
    textAlign: 'center',
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
};

const Title = ({
    layout,
    title,
    subtitle,
    description,
    groups,
    grid,
    background,
    box,
    textAlign,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
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

    let contentJustifyContentValue;

    switch (layout) {
        default:
        case 'center':
            contentJustifyContentValue = 'center'; break;
        case 'top':
            contentJustifyContentValue = 'flex-start'; break;
        case 'bottom':
            contentJustifyContentValue = 'flex-end'; break;
        case 'around':
            contentJustifyContentValue = 'space-around'; break;
        case 'between':
            contentJustifyContentValue = 'space-between'; break;
    }

    return (
        <div className={classNames([
            styles.container,
            {
                [styles[textAlign]]: textAlign !== null,
                [className]: className !== null,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content} style={{
                    justifyContent: contentJustifyContentValue,
                }}>
                    {items}
                </div>
            </Container>
        </div>
    );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default React.memo(Title);
