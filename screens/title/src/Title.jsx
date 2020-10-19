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
    description: MicromagPropTypes.textElement,
    descriptionPlaceholder: PropTypes.bool,
    descriptionEmptyContent: PropTypes.node,
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
    descriptionEmptyContent: null,
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
    descriptionEmptyContent,
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
    let items = [];

    if (isPlaceholder) {
        items = [
            <PlaceholderTitle />,
            <PlaceholderSubtitle />
        ];
        if (descriptionPlaceholder) {
            items.push(<PlaceholderSubtitle />)
        }
    } else if (isEmpty) {
        items = [
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>,
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Subtitle" description="Subtitle placeholder" />
            </Empty>
        ]
        if (descriptionPlaceholder) {
            items.push(
                <Empty className={styles.empty}>
                    {descriptionEmptyContent !== null ? descriptionEmptyContent : (
                        <FormattedMessage
                            defaultMessage="Description"
                            description="Description placeholder"
                        />
                    )}
                </Empty>
            );
        }
    } else {
        if (withTitle) {
            items.push(<Heading {...title} size={1} />);
        }
        if (withSubtitle) {
            items.push(<Heading {...subtitle} size={2} />);
        }
        if (withDescription) {
            items.push(<Text {...description} />);
        }
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
            >
                {isView ? (
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        playing
                    >
                        {items}
                    </TransitionsStagger>
                ) : (
                    items
                )}
            </Container>
        </div>
    );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default React.memo(Title);
