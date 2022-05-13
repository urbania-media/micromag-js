import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '@micromag/core/components';

import ShareModal from './ShareModal';

import styles from '../../styles/partials/share-button.module.scss';

const propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onShare: PropTypes.func,
    children: PropTypes.node,
    focusable: PropTypes.bool,
};

const defaultProps = {
    title: null,
    url: null,
    className: null,
    buttonClassName: null,
    onShare: null,
    children: null,
    focusable: false,
};

const ShareButton = ({ title, url, className, buttonClassName, onShare, children, focusable }) => {
    const intl = useIntl();
    const [storyShareModalOpened, setStoryShareModalOpened] = useState(false);

    const onShareIconClick = useCallback(() => {
        setStoryShareModalOpened((opened) => !opened);
    }, [setStoryShareModalOpened]);

    const onStoryShared = useCallback(
        (type) => {
            console.log('story shared'); // eslint-disable-line
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
                onCancel={onStoryShareCanceled}
            />
        </div>
    );
};

ShareButton.propTypes = propTypes;
ShareButton.defaultProps = defaultProps;

export default ShareButton;
