/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';
import styles from './results.module.scss';

const propTypes = {
    title: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
    layout: PropTypes.string,
    transitions: MicromagPropTypes.transitions,
    transitionPlaying: PropTypes.bool,
    transitionStagger: PropTypes.number,
    transitionDisabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

const defaultProps = {
    title: null,
    description: null,
    layout: null,
    transitions: null,
    transitionPlaying: false,
    transitionStagger: 100,
    transitionDisabled: false,
    className: null,
    style: null,
};

const Results = ({
    layout,
    title,
    description,
    transitions,
    transitionPlaying,
    transitionStagger,
    transitionDisabled,
    className,
    style,
}) => {
    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);

    return (
        <Layout
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            fullscreen
            verticalAlign={verticalAlign}
            style={style}
        >
            {[
                <ScreenElement
                    key="title"
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage defaultMessage="Title" description="Placeholder label" />
                    }
                    emptyClassName={styles.emptyTitle}
                    isEmpty={!hasTitle}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            disabled={transitionDisabled}
                        >
                            <Heading {...title} className={styles.title} />
                        </Transitions>
                    ) : null}
                </ScreenElement>,
                isSplitted ? <Spacer key="spacer" /> : null,
                <ScreenElement
                    key="description"
                    placeholder="text"
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Description"
                            description="Placeholder label"
                        />
                    }
                    emptyClassName={styles.emptyDescription}
                    isEmpty={!hasDescription}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            disabled={transitionDisabled}
                            delay={transitionStagger}
                        >
                            <Text {...description} className={styles.description} />
                        </Transitions>
                    ) : null}
                </ScreenElement>,
            ]}
        </Layout>
    );
};

Results.propTypes = propTypes;
Results.defaultProps = defaultProps;

export default Results;
