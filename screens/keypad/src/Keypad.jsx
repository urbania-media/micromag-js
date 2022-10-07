/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderButton } from '@micromag/core/components';
// import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useScreenState,
    useViewerContext,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useDragProgress } from '@micromag/core/hooks';
import { getStyleFromText, getStyleFromBox } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Keypad from '@micromag/element-keypad';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './keypad.module.scss';

const stopDragEventsPropagation = {
    onTouchMove: (e) => e.stopPropagation(),
    onTouchStart: (e) => e.stopPropagation(),
    onTouchEnd: (e) => e.stopPropagation(),
    onPointerMove: (e) => e.stopPropagation(),
    onPointerUp: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
};

// @todo is this still good? if yes, maybe extract to util?
// const mouseBlocker = {
//     ...stopDragEventsPropagation,
//     onClick: (e) => e.stopPropagation(),
//     style: {
//         position: 'fixed',
//         zIndex: '1000',
//         top: 0,
//         right: 0,
//         bottom: 0,
//         left: 0,
//         cursor: 'default',
//     },
// };

const propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            heading: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
            visual: MicromagPropTypes.visualElement,
            boxStyle: MicromagPropTypes.boxStyle,
        }),
    ),
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    keypadLayout: PropTypes.shape({
        columnAlign: PropTypes.oneOf(['left', 'right', 'middle']),
        columns: PropTypes.number,
        spacing: PropTypes.number,
        withSquareItems: PropTypes.bool
    }),
    // rowAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
    buttonLayout: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    boxStyle: MicromagPropTypes.boxStyle,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    layout: 'middle',
    keypadLayout: null,
    // columnAlign: null,
    // columns: 5,
    // spacing: 5,
    buttonLayout: 'label-bottom', // @todo do we need a default here?
    textStyle: null,
    boxStyle: null,
    background: null,
    current: true,
    active: true,
    className: null,
};

const KeypadScreen = ({
    items,
    layout,
    keypadLayout,
    // columnAlign,
    // rowAlign,
    // columns,
    // spacing,
    buttonLayout,
    textStyle,
    boxStyle,
    background,
    current,
    active,
    className,
}) => {
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

    const { columnAlign = null, columns = null, spacing = null, withSquareItems = true } = keypadLayout || {};

    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState(null);

    const onItemClick = useCallback(
        (e, item) => {
            e.stopPropagation();
            setPopupContent(item);
            setShowPopup(1);
            // trackScreenEvent('UrbaniaHoroscope', 'select_sign', signs[foundSignIndex]);
        },
        [setPopupContent],
        // [setPopupContent, trackScreenEvent],
    );

    const onCloseModal = useCallback(() => {
        setShowPopup(0);
        // trackScreenEvent('UrbaniaHoroscope', 'close_sign_modal');
        // }, [setShowPopup, trackScreenEvent]);
    }, [setShowPopup]);

    const computePopupProgress = useCallback(
        ({ active: dragActive, movement: [, my], velocity: [, vy] }) => {
            const damper = 0.5;
            const p = Math.max(0, my) / window.innerHeight;
            const progress = p * damper;
            const reachedThreshold = vy > 0.3 || Math.abs(p) > 0.3;

            if (!dragActive) {
                if (reachedThreshold) {
                    onCloseModal();
                }
                return reachedThreshold ? 0 : 1;
            }
            return 1 - progress;
        },
        [onCloseModal],
    );

    const { bind: bindPopupDrag, progress: popupSpring } = useDragProgress({
        disabled: !isView,
        progress: showPopup ? 1 : 0,
        computeProgress: computePopupProgress,
        springParams: { config: { tension: 300, friction: 30 } },
    });

    // @todo extract to element?
    const gridItems =
        items !== null
            ? items.map((item) => {
                  const {
                      label = null,
                      visual = null,
                      textStyle: customTextStyle = null,
                      boxStyle: customBoxStyle = null,
                      content = null,
                      largeVisual = null,
                  } = item || {};
                  const { body: key = null } = label || {};
                  return (
                      <div key={key} className={styles.item}>
                          <Button
                              className={classNames([
                                  styles.button,
                                  {
                                      [styles.layoutLabelBottom]: buttonLayout === 'label-bottom',
                                      [styles.layoutLabelTop]: buttonLayout === 'label-top',
                                      [styles.layoutNoLabel]: buttonLayout === 'no-label',
                                      [styles.layoutLabelOver]: buttonLayout === 'label-over',
                                  },
                              ])}
                              style={{
                                  ...getStyleFromBox(boxStyle),
                                  ...getStyleFromText(textStyle),
                                  ...getStyleFromBox(customBoxStyle),
                                  ...getStyleFromText(customTextStyle),
                              }}
                              onClick={
                                  content !== null && largeVisual !== null
                                      ? (e) => onItemClick(e, item)
                                      : false
                              }
                          >
                              {visual !== null ? (
                                  <Visual
                                      className={styles.buttonVisual}
                                      imageClassName={styles.thumbnail}
                                      media={visual}
                                      width="auto"
                                  />
                              ) : null}
                              {label !== null ? (
                                  <div className={styles.buttonLabel}>{label}</div>
                              ) : null}
                          </Button>
                      </div>
                  );
              })
            : [];
    const placeholderItems = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <div key={`${n}-placeholder`} className={styles.gridItem}>
            <PlaceholderButton className={styles.placeholderButton} />
        </div>
    ));

    const { content: popupText = null, largeVisual = null } = popupContent || {};

    const hasPopupContent = (item) => {
        const { content = null, largeVisual: popupLargeVisual = null } = item || {};
        const { body = null } = content || {};
        return (body !== null && body !== '') || popupLargeVisual !== null;
    }

    // for editor purposes
    const screenState = useScreenState();

    useEffect(() => {
        if (screenState === 'keypad') {
            setPopupContent(null);
            setShowPopup(0);
        }
        if (screenState !== null && screenState.includes('items')) {
            const index = screenState.split('.').pop();
            const found = items[index];
            const popupVisibility = hasPopupContent(found) ? 1 : 0;
            setShowPopup(popupVisibility);
            setPopupContent(found);
        }
    }, [screenState, items]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.withSquareItems]: withSquareItems,
                },
            ])}
            data-screen-ready
        >
            {/* @todo needed? */}
            {/* {!isView ? <div {...mouseBlocker} /> : null} */}
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
                    verticalAlign={layout}
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
                >
                    <Keypad
                        className={classNames([
                            styles.grid,
                            { [styles.gridPlaceholder]: isPlaceholder },
                        ])}
                        align={columnAlign}
                        columns={isPlaceholder ? 3 : columns}
                        spacing={isPlaceholder ? 2 : spacing}
                    >
                        {isPlaceholder ? placeholderItems : gridItems}
                    </Keypad>

                    <animated.div
                        className={styles.popup}
                        style={{
                            transform: popupSpring.to(
                                (p) => `translateY(${100 * (1 - (p < 0.2 ? 0.1 * p + p : p))}%)`,
                            ),
                            pointerEvents: popupSpring.to((p) => (p < 0.1 ? 'none' : 'auto')),
                        }}
                        {...bindPopupDrag()}
                    >
                        <button
                            type="button"
                            className={styles.popupButton}
                            onClick={() => {
                                if (onCloseModal !== null) {
                                    onCloseModal();
                                }
                            }}
                        >
                            <div className={styles.popupInner}>
                                {popupText !== null ? <Text {...popupText} /> : null}
                                {largeVisual !== null ? (
                                    <Visual media={largeVisual} width="100%" />
                                ) : null}
                            </div>
                        </button>
                    </animated.div>
                </Layout>
            </Container>
        </div>
    );
};

KeypadScreen.propTypes = propTypes;
KeypadScreen.defaultProps = defaultProps;

export default React.memo(KeypadScreen);
