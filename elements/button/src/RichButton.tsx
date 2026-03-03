/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BoxStyle, Media, TextElement, TextStyle } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import Button from './Button';

import styles from './styles.module.css';

interface RichButtonProps {
    label?: TextElement;
    visual?: Media;
    visualWidth?: number | string;
    labelBoxStyle?: BoxStyle;
    textStyle?: TextStyle;
    buttonStyle?: BoxStyle;
    resolution?: number;
    shouldLoad?: boolean;
    layout?: 'label-bottom' | 'label-top' | 'no-label' | 'label-over' | 'label-right';
    type?: 'button' | 'submit';
    disabled?: boolean;
    focusable?: boolean;
    inline?: boolean;
    onClick?: (...args: unknown[]) => void;
    className?: string;
    textClassName?: string;
    imageClassName?: string;
    videoClassName?: string;
    visualClassName?: string;
    withoutExternalBorder?: boolean;
    refButton?: (...args: unknown[]) => void | { current?: unknown };
    children?: React.ReactNode;
}

function RichButton({
    label = null,
    visual = null,
    visualWidth = null,
    labelBoxStyle = null,
    textStyle = null,
    buttonStyle = null,
    resolution = null,
    shouldLoad = true,
    layout = 'label-bottom',
    type = 'button',
    disabled = false,
    focusable = true,
    inline = false,
    onClick = null,
    className = null,
    textClassName = null,
    visualClassName = null,
    imageClassName = null,
    videoClassName = null,
    withoutExternalBorder = true,
    refButton = null,
    children = null,
    ...otherProps
}) {
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

    return (
        <Tag
            type={type}
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
                    [styles.layoutLabelRight]: finalLayout === 'label-right',
                    [styles.textFullWidth]:
                        hasBody &&
                        (!hasVisual || (layout !== 'label-right' && layout !== 'label-left')),
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
                        textStyle={textStyle}
                        body={body}
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
}

export default RichButton;
