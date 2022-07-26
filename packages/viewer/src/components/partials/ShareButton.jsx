import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@micromag/core/components';

import ShareModal from './ShareModal';

import styles from '../../styles/partials/share-button.module.scss';

const propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onShare: PropTypes.func,
    currentScreenIndex: PropTypes.number,
    children: PropTypes.node,
    focusable: PropTypes.bool,
};

const defaultProps = {
    title: null,
    url: null,
    className: null,
    buttonClassName: null,
    onShare: null,
    currentScreenIndex: 0,
    children: null,
    focusable: false,
};

const ShareButton = ({
    title,
    url,
    className,
    buttonClassName,
    onShare,
    currentScreenIndex,
    children,
    focusable,
}) => {
    const intl = useIntl();
    const [storyShareModalOpened, setStoryShareModalOpened] = useState(false);

    const onShareIconClick = useCallback(() => {
        setStoryShareModalOpened((opened) => !opened);
    }, [setStoryShareModalOpened, storyShareModalOpened]);

    const onStoryShared = useCallback(
        (type) => {
            setStoryShareModalOpened(false);
            if (onShare !== null) {
                onShare(type);
            }
        },
        [setStoryShareModalOpened, onShare],
    );

    const onStoryShareCanceled = useCallback(() => {
        setStoryShareModalOpened(false);
    }, [setStoryShareModalOpened]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Button
                className={classNames([{ [buttonClassName]: buttonClassName !== null }])}
                onClick={onShareIconClick}
                title={intl.formatMessage({
                    defaultMessage: 'Share',
                    description: 'Button label',
                })}
                aria-label={intl.formatMessage({
                    defaultMessage: 'Share',
                    description: 'Button label',
                })}
                focusable={focusable}
            >
                {children}
            </Button>
            <ShareModal
                className={styles.shareModal}
                opened={storyShareModalOpened}
                title={title}
                url={url}
                onShare={onStoryShared}
                currentScreenIndex={currentScreenIndex}
                onCancel={onStoryShareCanceled}
            />
        </div>
    );
};

ShareButton.propTypes = propTypes;
ShareButton.defaultProps = defaultProps;

export default ShareButton;
