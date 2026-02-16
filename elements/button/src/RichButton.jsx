/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import Button from './Button';

import styles from './styles.module.scss';

const propTypes = {
    label: MicromagPropTypes.textElement,
    visual: MicromagPropTypes.media,
    visualWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelBoxStyle: MicromagPropTypes.boxStyle,
    textStyle: MicromagPropTypes.textStyle,
    buttonStyle: MicromagPropTypes.boxStyle,
    resolution: PropTypes.number,
    shouldLoad: PropTypes.bool,
    layout: PropTypes.oneOf(['label-bottom', 'label-top', 'no-label', 'label-over', 'label-right']),
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
    focusable: PropTypes.bool,
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    textClassName: PropTypes.string,
    imageClassName: PropTypes.string,
    videoClassName: PropTypes.string,
    visualClassName: PropTypes.string,
    withoutExternalBorder: PropTypes.bool,
    refButton: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
    children: PropTypes.node,
};

const defaultProps = {
    label: null,
    visual: null,
    visualWidth: null,
    labelBoxStyle: null,
    textStyle: null,
    buttonStyle: null,
    resolution: null,
    shouldLoad: true,
    layout: 'label-bottom',
    type: 'button',
    disabled: false,
    focusable: true,
    inline: false,
    onClick: null,
    className: null,
    textClassName: null,
    imageClassName: null,
    videoClassName: null,
    visualClassName: null,
    withoutExternalBorder: true,
    refButton: null,
    children: null,
};

const RichButton = ({
    label,
    visual,
    visualWidth,
    labelBoxStyle,
    textStyle,
    buttonStyle,
    resolution,
    shouldLoad,
    layout,
    type,
    disabled,
    focusable,
    inline,
    onClick,
    className,
    textClassName,
    visualClassName,
    imageClassName,
    videoClassName,
    withoutExternalBorder,
    refButton,
    children,
    ...otherProps
}) => {
    const Tag = useMemo(() => {
        switch (type) {
            case 'submit':
                return Button;
            case 'button':
                return Button;
            default:
                return 'div';
        }
    }, [type]);
    const { url: visualUrl = null } = visual || {};
    const hasVisual = visualUrl !== null;
    const { body = null } = label || {};
    const hasBody = body !== null && body.trim() !== '';
    const showLabel = layout !== 'no-label';
    const defaultWidth =
        (layout === 'label-left' || layout === 'label-right') && hasBody && hasVisual
            ? '30%'
            : '100%';
    const finalLayout = hasVisual ? layout : null;

    // console.log('finalLayout', finalLayout);

    return (
        <Tag
            type={type}
            textStyle={textStyle}
            buttonStyle={buttonStyle}
            disabled={disabled}
            focusable={focusable}
            inline={inline}
            onClick={onClick}
            className={classNames([
                styles.container,
                styles.rich,
                {
                    [styles.layoutLabelBottom]: finalLayout === 'label-bottom',
                    [styles.layoutLabelTop]: finalLayout === 'label-top',
                    [styles.layoutNoLabel]: finalLayout === 'no-label',
                    [styles.layoutLabelOver]: finalLayout === 'label-over',
                    [styles.layoutLabelLeft]: finalLayout === 'label-left',
                    [className]: className !== null,
                },
            ])}
            withoutExternalBorder={withoutExternalBorder}
            refButton={refButton}
            {...otherProps}
        >
            <ScreenElement
                placeholder="button"
                emptyLabel={
                    <FormattedMessage defaultMessage="Button" description="Button placeholder" />
                }
                emptyClassName={styles.emptyButton}
                isEmpty={!hasVisual && !hasBody}
            >
                {hasVisual ? (
                    <Visual
                        media={visual}
                        width={visualWidth || defaultWidth}
                        resolution={resolution}
                        shouldLoad={shouldLoad}
                        className={classNames([
                            styles.visual,
                            {
                                [visualClassName]: visualClassName !== null,
                            },
                        ])}
                        imageClassName={classNames([
                            styles.image,
                            {
                                [imageClassName]: imageClassName !== null,
                            },
                        ])}
                        videoClassName={classNames([
                            styles.video,
                            {
                                [videoClassName]: videoClassName !== null,
                            },
                        ])}
                    />
                ) : null}
                {hasBody && showLabel ? (
                    <Text
                        boxStyle={labelBoxStyle}
                        {...label}
                        className={classNames([
                            styles.text,
                            {
                                [textClassName]: textClassName !== null,
                            },
                        ])}
                    />
                ) : null}
                {children}
            </ScreenElement>
        </Tag>
    );
};

RichButton.propTypes = propTypes;
RichButton.defaultProps = defaultProps;

export default RichButton;
