/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder, ScreenPreview } from '@micromag/core/components';
import { useIsVisible } from '@micromag/core/hooks';
import { isMessage } from '@micromag/core/utils';

import ScreenButton from './Screen';

import styles from '../../styles/buttons/screen-with-preview.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screenComponent,
    screenState: PropTypes.string,
    index: PropTypes.number.isRequired,
    href: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.bool,
    withPlaceholder: PropTypes.bool,
    withIndexIndicator: PropTypes.bool,
    withName: PropTypes.bool,
    withDeleteButtonOnRepeatables: PropTypes.bool,
    onClick: PropTypes.func,
    onClickItem: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    screenState: null,
    title: null,
    href: null,
    active: false,
    withPlaceholder: false,
    withIndexIndicator: false,
    withName: false,
    withDeleteButtonOnRepeatables: false,
    onClick: null,
    onClickItem: null,
    onDeleteButtonClick: null,
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
    onClick,
    onClickItem,
    withName,
    withPlaceholder,
    withIndexIndicator,
    withDeleteButtonOnRepeatables,
    onDeleteButtonClick,
}) => {
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
};

ScreenWithPreview.propTypes = propTypes;
ScreenWithPreview.defaultProps = defaultProps;

export default ScreenWithPreview;
