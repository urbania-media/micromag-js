/* eslint-disable react/jsx-props-no-spreading */
// import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Text from '@micromag/element-text';
// import Grid from '@micromag/element-grid'; // @todo uhhh... can't really use this; overkill!
import Keypad from '@micromag/element-keypad';
import Layout from '@micromag/element-layout';

import styles from './grid.module.scss';

const stopDragEventsPropagation = {
    onTouchMove: (e) => e.stopPropagation(),
    onTouchStart: (e) => e.stopPropagation(),
    onTouchEnd: (e) => e.stopPropagation(),
    onPointerMove: (e) => e.stopPropagation(),
    onPointerUp: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
};

// @todo is this still good? if yes, maybe extract to util?
const mouseBlocker = {
    ...stopDragEventsPropagation,
    onClick: (e) => e.stopPropagation(),
    style: {
        position: 'fixed',
        zIndex: '1000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        cursor: 'default',
    },
};

const propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            description: MicromagPropTypes.textElement,
        }),
    ),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    className: null,
};

const GridScreen = ({ items, spacing, background, current, active, className }) => {
    // const intl = useIntl();
    // const trackScreenEvent = useTrackScreenEvent(type);
    // const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);

    const gridItems = items.map((item) => {
        const { id = null, description = null } = item || {};
        if (description === null) return false;
        return (
            <div key={id} className={styles.gridItem}>
                <Text {...description} />
            </div>
        );
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            {!isView ? <div {...mouseBlocker} /> : null}
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mediaRef}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) + spacing,
                              }
                            : null
                    }
                    // height={height * 0.8}
                >
                    {!isPlaceholder ? (
                        <Keypad
                            className={styles.grid}
                            items={gridItems}
                        />
                    ) : null}
                </Layout>
            </Container>
        </div>
    );
};

GridScreen.propTypes = propTypes;
GridScreen.defaultProps = defaultProps;

export default React.memo(GridScreen);
