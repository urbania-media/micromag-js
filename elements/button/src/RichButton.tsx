import classNames from 'classnames';
import React, { ForwardedRef, MouseEventHandler, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BoxStyle, Media, TextElement, TextStyle } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import Button from './Button';

import styles from './styles.module.css';

interface RichButtonProps {
    label?: TextElement | null;
    visual?: Media | null;
    visualWidth?: number | string | null;
    labelBoxStyle?: BoxStyle | null;
    textStyle?: TextStyle | null;
    buttonStyle?: BoxStyle | null;
    resolution?: number | null;
    shouldLoad?: boolean;
    layout?: 'label-bottom' | 'label-top' | 'no-label' | 'label-over' | 'label-right';
    type?: 'button' | 'submit';
    disabled?: boolean;
    focusable?: boolean;
    inline?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement> | null;
    className?: string | null;
    textClassName?: string | null;
    imageClassName?: string | null;
    videoClassName?: string | null;
    visualClassName?: string | null;
    withoutExternalBorder?: boolean;
    ref?: ForwardedRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>;
    children?: React.ReactNode | null;
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
    ref: refButton = null,
    children = null,
    ...otherProps
}: RichButtonProps) {
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
                className,
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
                },
            ])}
            withoutExternalBorder={withoutExternalBorder}
            ref={refButton}
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
                        className={classNames([styles.visual, visualClassName])}
                        imageClassName={classNames([styles.image, imageClassName])}
                        videoClassName={classNames([styles.video, videoClassName])}
                    />
                ) : null}
                {hasBody && showLabel ? (
                    <Text
                        boxStyle={labelBoxStyle}
                        textStyle={textStyle}
                        body={body}
                        className={classNames([styles.text, textClassName])}
                    />
                ) : null}
                {children}
            </ScreenElement>
        </Tag>
    );
}

export default RichButton;
