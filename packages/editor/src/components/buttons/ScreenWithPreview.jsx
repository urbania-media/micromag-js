/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
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
    screen: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
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
    buttonClassName: PropTypes.string,
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
    buttonClassName: null,
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
    buttonClassName,
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

    const previewStyle = useMemo(() => {
        const { width: itemWidth = 0, height: itemHeight = 0 } = contentRect || {};
        const ratio = itemHeight !== 0 && itemWidth !== 0 ? itemHeight / itemWidth : 2 / 3;
        const finalWidth = previewWidth;
        const finalHeight = previewHeight !== null ? previewHeight : previewWidth * ratio;
        const { scale: previewScale } = getSizeWithinBounds(
            finalWidth,
            finalHeight,
            itemWidth,
            itemHeight,
        );
        return {
            width: finalWidth,
            height: finalHeight,
            transform: `scale(${previewScale}, ${previewScale})`,
        };
    }, [previewWidth, previewHeight, contentRect]);
    const { width: screenWidth, height: screenHeight } = previewStyle;

    const ScreenComponent = withPlaceholder ? ScreenPlaceholder : ScreenPreview;

    return (
        <ScreenButton
            href={href}
            ref={refResize}
            active={active}
            className={classNames([
                styles.button,
                {
                    [buttonClassName]: buttonClassName !== null,
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
                className={classNames({
                    [styles.preview]: withPreview && !withPlaceholder,
                    [styles.placeholder]: withPlaceholder && !withPreview,
                })}
                style={previewStyle}
            >
                <ScreenComponent
                    screen={screen}
                    screenState={screenState}
                    width={screenWidth}
                    height={screenHeight}
                    className={styles.screen}
                />
            </div>
        </ScreenButton>
    );
};

ScreenWithPreview.propTypes = propTypes;
ScreenWithPreview.defaultProps = defaultProps;

export default ScreenWithPreview;
