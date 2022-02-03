/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPlaceholder, ScreenPreview } from '@micromag/core/components';
import { isMessage } from '@micromag/core/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import styles from '../../styles/buttons/screen-with-preview.module.scss';
import ScreenButton from './Screen';

const propTypes = {
    screen: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    index: PropTypes.number.isRequired,
    title: PropTypes.string,
    previewStyle: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    withPreview: PropTypes.bool,
    withPlaceholder: PropTypes.bool,
    onClick: PropTypes.func,
    onClickItem: PropTypes.func,
    buttonClassName: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    title: null,
    previewStyle: null,
    withPreview: true,
    withPlaceholder: false,
    onClick: null,
    onClickItem: null,
    buttonClassName: null,
    className: null,
};

const ScreenWithPreview = ({
    screen,
    index,
    title,
    className,
    buttonClassName,
    previewStyle,
    onClick,
    onClickItem,
    withPreview,
    withPlaceholder,
}) => {
    const intl = useIntl();
    const { width = null, height = null } = previewStyle || {};
    return (
        <ScreenButton
            {...screen}
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
            {withPreview && !withPlaceholder ? (
                <div className={styles.preview} style={previewStyle}>
                    <ScreenPreview
                        screen={screen}
                        width={width}
                        height={height}
                        className={styles.screen}
                    />
                </div>
            ) : null}
            {withPlaceholder && !withPreview ? (
                <div className={styles.placeholder} style={previewStyle}>
                    <ScreenPlaceholder
                        screen={screen}
                        width={width}
                        height={height}
                        className={styles.screen}
                    />
                </div>
            ) : null}
        </ScreenButton>
    );
};

ScreenWithPreview.propTypes = propTypes;
ScreenWithPreview.defaultProps = defaultProps;

export default ScreenWithPreview;
