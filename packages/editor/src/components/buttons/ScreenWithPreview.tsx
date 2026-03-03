/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ScreenComponent } from '@micromag/core';
import { ScreenPlaceholder, ScreenPreview } from '@micromag/core/components';
import { useIsVisible } from '@micromag/core/hooks';
import { isMessage } from '@micromag/core/utils';

import ScreenButton from './Screen';

import styles from '../../styles/buttons/screen-with-preview.module.css';

interface ScreenWithPreviewProps {
    screen?: ScreenComponent;
    screenState?: string;
    index: number;
    href?: string;
    title?: string;
    active?: boolean;
    withPlaceholder?: boolean;
    withIndexIndicator?: boolean;
    withName?: boolean;
    withDeleteButtonOnRepeatables?: boolean;
    onClick?: (...args: unknown[]) => void;
    onClickItem?: (...args: unknown[]) => void;
    onDeleteButtonClick?: (...args: unknown[]) => void;
    className?: string;
}

function ScreenWithPreview(
    {
        screen = null,
        screenState = null,
        index,
        title = null,
        href = null,
        active = false,
        className = null,
        onClick = null,
        onClickItem = null,
        withName = false,
        withPlaceholder = false,
        withIndexIndicator = false,
        withDeleteButtonOnRepeatables = false,
        onDeleteButtonClick = null,
    },
) {
    const intl = useIntl();
    const { ref, visible } = useIsVisible({ threshold: 0.1 });

    const ScreenComponent = withPlaceholder ? ScreenPlaceholder : ScreenPreview;
    const finalTitle = isMessage(title) ? intl.formatMessage(title) : title || null;

    return (
        <div ref={ref}>
            <ScreenButton
                href={href}
                active={active}
                className={classNames([
                    styles.button,
                    {
                        [className]: className !== null,
                        [styles.withIndex]: withIndexIndicator || withName,
                    },
                ])}
                title={finalTitle}
                onClick={() => {
                    if (onClick !== null) {
                        onClick(screen, index);
                    }
                    if (onClickItem !== null) {
                        onClickItem(screen, index);
                    }
                }}
            >
                <ScreenComponent
                    screen={screen}
                    screenState={screenState}
                    className={styles.screen}
                    hidden={!visible}
                    withSize
                />
                {index !== null && withIndexIndicator ? (
                    <div className={styles.index}>{index + 1}</div>
                ) : null}
                {withName && !withIndexIndicator ? (
                    <div className={styles.name}>{finalTitle || null}</div>
                ) : null}
                {withDeleteButtonOnRepeatables ? (
                    <div className={styles.deleteButton} onClick={onDeleteButtonClick}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </div>
                ) : null}
            </ScreenButton>
        </div>
    );
}

export default ScreenWithPreview;
