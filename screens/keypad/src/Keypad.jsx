/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderButton } from '@micromag/core/components';
// import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { getStyleFromText, getStyleFromBox } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Keypad from '@micromag/element-keypad';
import Layout from '@micromag/element-layout';
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
    columnAlign: PropTypes.oneOf(['left', 'right', 'middle']),
    // rowAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
    columns: PropTypes.number,
    spacing: PropTypes.number,
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
    columnAlign: null,
    // rowAlign: null,
    columns: 5,
    spacing: 5,
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
    columnAlign,
    // rowAlign,
    columns,
    spacing,
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

    const onItemClick = useCallback((e, item) => {
        console.log({ item });
    }, []);

    // @todo extract to element?
    const gridItems =
        items !== null
            ? items.map((item) => {
                  const {
                      label = null,
                      visual = null,
                      textStyle: customTextStyle = null,
                      boxStyle: customBoxStyle = null,
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
                              onClick={(e) => onItemClick(e, item)}
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
                </Layout>
            </Container>
        </div>
    );
};

KeypadScreen.propTypes = propTypes;
KeypadScreen.defaultProps = defaultProps;

export default React.memo(KeypadScreen);
