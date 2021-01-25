import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '@micromag/core/components';

import ShareModal from './ShareModal';

import styles from '../../styles/partials/share-button.module.scss';


const propTypes = {
    url: PropTypes.string,
    className: PropTypes.string,
    onShare: PropTypes.func,
    children: PropTypes.node,
};

const defaultProps = {
    url: null,
    className: null,
    onShare: null,
    children: null,
};

const ShareButton = ({ url, className, onShare, children }) => {

    const [storyShareModalOpened, setStoryShareModalOpened] = useState(false);

    const onShareIconClick = useCallback(() => {
        setStoryShareModalOpened((opened) => !opened);
    }, [setStoryShareModalOpened]);
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
                },
            ])}
        >
            <Button className={className} onClick={onShareIconClick}>{children}</Button>
            <ShareModal
                className={styles.shareModal}
                opened={storyShareModalOpened}
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
