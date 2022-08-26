/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder, ScreenPreview } from '@micromag/core/components';
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
    onClick,
    onClickItem,
    withPlaceholder,
}) => {
    const intl = useIntl();

    const ScreenComponent = withPlaceholder ? ScreenPlaceholder : ScreenPreview;

    return (
        <ScreenButton
            href={href}
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
            <ScreenComponent
                screen={screen}
                screenState={screenState}
                className={styles.screen}
                withSize
            />
        </ScreenButton>
    );
};

ScreenWithPreview.propTypes = propTypes;
ScreenWithPreview.defaultProps = defaultProps;

export default ScreenWithPreview;
