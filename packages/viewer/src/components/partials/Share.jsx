/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ShareOptions from '@micromag/element-share-options';

import styles from '../../styles/partials/share.module.scss';

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    opened: PropTypes.bool,
    className: PropTypes.string,
    onShare: PropTypes.func,
    currentScreenIndex: PropTypes.number,
    shareCurrentScreen: PropTypes.bool,
};

const defaultProps = {
    url: null,
    title: null,
    opened: false,
    className: null,
    onShare: null,
    currentScreenIndex: 0,
    shareCurrentScreen: false,
};

const Share = ({ url, title, opened, className, onShare, currentScreenIndex, shareCurrentScreen }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className,
            },
        ])}
    >
        <div className={styles.content}>
            {currentScreenIndex !== 0 ? (
                <div className={styles.mode}>
                    <label>
                        <input
                            type="checkbox"
                            name="currentScreen"
                            value="currentScreen"
                            onChange={onShare}
                            checked={shareCurrentScreen}
                        />
                        <FormattedMessage
                            defaultMessage="Start from the current screen"
                            description="Share mode"
                        />
                    </label>
                </div>
            ) : null}
        </div>

        <ShareOptions
            className={styles.shareOptions}
            itemClassName={styles.shareOptionsItem}
            buttonClassName={styles.shareOptionsButton}
            title={title}
            url={url}
            focusable={opened}
            onShare={onShare}
        />
    </div>
);

Share.propTypes = propTypes;
Share.defaultProps = defaultProps;

export default Share;
