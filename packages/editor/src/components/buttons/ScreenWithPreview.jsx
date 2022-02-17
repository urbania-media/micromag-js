/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder, ScreenPreview } from '@micromag/core/components';
import { useResizeObserver } from '@micromag/core/hooks';
import { isMessage } from '@micromag/core/utils';
import styles from '../../styles/buttons/screen-with-preview.module.scss';
import ScreenButton from './Screen';

const propTypes = {
    screen: MicromagPropTypes.screenComponent,
    screenState: PropTypes.string,
    index: PropTypes.number.isRequired,
    href: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.bool,
    previewWidth: PropTypes.number,
    previewHeight: PropTypes.number,
    withPreview: PropTypes.bool,
    withPlaceholder: PropTypes.bool,
    onClick: PropTypes.func,
    onClickItem: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    screenState: null,
    title: null,
    href: null,
    active: false,
    previewWidth: 320,
    previewHeight: 480,
    withPreview: true,
    withPlaceholder: false,
    onClick: null,
    onClickItem: null,
    className: null,
};

const ScreenWithPreview = ({
    screen,
    screenState,
    index,
    title,
    href,
    active,
    className,
    previewWidth,
    previewHeight,
    onClick,
    onClickItem,
    withPreview,
    withPlaceholder,
}) => {
    const intl = useIntl();
    const {
        ref: refResize,
        entry: { contentRect },
    } = useResizeObserver();

    const { width, height, screenWidth, screenHeight, scale } = useMemo(() => {
        const { width: itemWidth = 0 } = contentRect || {};
        const ratio = 3 / 4;
        const finalWidth = previewWidth;
        const finalHeight = previewHeight !== null ? previewHeight : previewWidth * ratio;
        const previewScale = itemWidth / previewWidth;
        return {
            width: itemWidth,
            height: finalHeight * previewScale,
            screenWidth: finalWidth,
            screenHeight: finalHeight,
            scale: previewScale,
        };
    }, [withPlaceholder, previewWidth, previewHeight, contentRect]);

    const ScreenComponent = withPlaceholder ? ScreenPlaceholder : ScreenPreview;

    return (
        <ScreenButton
            href={href}
            ref={refResize}
            active={active}
            className={classNames([
                styles.button,
                {
                    [className]: className !== null,
                },
            ])}
            title={isMessage(title) ? intl.formatMessage(title) : null}
            onClick={() => {
                if (onClick !== null) {
                    onClick(screen, index);
                }
                if (onClickItem !== null) {
                    onClickItem(screen, index);
                }
            }}
        >
            <div
                className={styles.frame}
                style={{
                    width,
                    height,
                }}
            >
                <div
                    className={classNames({
                        [styles.preview]: withPreview && !withPlaceholder,
                        [styles.placeholder]: withPlaceholder && !withPreview,
                    })}
                    style={{
                        width: withPlaceholder ? width : screenWidth,
                        height: withPlaceholder ? height : screenHeight,
                        transform: withPlaceholder ? null : `scale(${scale})`,
                    }}
                >
                    <ScreenComponent
                        screen={screen}
                        screenState={screenState}
                        width={withPlaceholder ? width : screenWidth}
                        height={withPlaceholder ? height : screenHeight}
                        className={styles.screen}
                    />
                </div>
            </div>
        </ScreenButton>
    );
};

ScreenWithPreview.propTypes = propTypes;
ScreenWithPreview.defaultProps = defaultProps;

export default ScreenWithPreview;
