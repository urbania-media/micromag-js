/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef } from 'react';
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
    PlaceholderSubtitle,
    Empty,
} from '@micromag/core';

import { getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';
import TransitionsStagger from '@micromag/core/src/components/transitions/TransitionsStagger';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split', 'split-top', 'split-bottom']),
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.headingElement,
    descriptionPlaceholder: PropTypes.bool,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    title: null,
    subtitle: null,
    description: null,
    descriptionPlaceholder: false,
    background: null,
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const Title = ({
    layout,
    title,
    subtitle,
    description,
    descriptionPlaceholder,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const withTitle = title !== null;
    const withSubtitle = subtitle !== null;
    const withDescription = description !== null;

    const isEmpty = isEditor && !withTitle && !withSubtitle && !description;

    // Create elements

    let titleElement = null;
    let subtitleElement = null;
    let descriptionElement = null;

    if (isPlaceholder) {
        titleElement = <PlaceholderTitle />;
        subtitleElement = <PlaceholderSubtitle />;
        descriptionElement = descriptionPlaceholder ? <PlaceholderSubtitle /> : null;
    } else if (isEmpty) {
        titleElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>
        );
        subtitleElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Subtitle" description="Subtitle placeholder" />
            </Empty>
        );
        descriptionElement = descriptionPlaceholder ? (
            <Empty className={styles.empty}>
                <FormattedMessage
                    defaultMessage="Description"
                    description="Description placeholder"
                />
            </Empty>
        ) : null;
    } else {
        if (withTitle) {
            titleElement = <Heading {...title} size={1} />;
        }
        if (withSubtitle) {
            subtitleElement = <Heading {...subtitle} size={2} />;
        }
        if (withDescription) {
            descriptionElement = <Text {...description} />;
        }
    }

    // Add elements to items

    const items = [];
    if (titleElement !== null) {
        items.push(titleElement);
    }

    if (subtitleElement !== null) {
        items.push(subtitleElement);
    }

    if (descriptionElement !== null) {
        items.push(descriptionElement);
    }

    // convert layout to Container props

    const layoutChunks = layout.split('-');
    const isDistribution = layoutChunks[0] === 'split';
    const verticalAlign = isDistribution ? layoutChunks[1] : layoutChunks[0];
    const distribution = isDistribution ? 'between' : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />

            <Container
                width={width}
                height={height}
                maxRatio={maxRatio}
                verticalAlign={verticalAlign}
                distribution={distribution}
            >
                <TransitionsStagger transitions={transitions} stagger={transitionStagger} playing>
                    {items}
                </TransitionsStagger>
            </Container>
        </div>
    );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default React.memo(Title);
