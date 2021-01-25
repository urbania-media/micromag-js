/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share';
import { Modal, ModalDialog } from '@micromag/core/components';

import styles from '../../styles/modals/share-story.module.scss';

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    facebookAppId: PropTypes.string,
    className: PropTypes.string,
    onShare: PropTypes.func,
    onCancel: PropTypes.func,
};

const defaultProps = {
    url: null,
    title: null,
    facebookAppId: null,
    className: null,
    onShare: null,
    onCancel: null,
};

const ShareStoryModal = ({ url, title, facebookAppId, className, onShare, onCancel }) => {
    const onShareButtonClick = useCallback(
        (type) => {
            if (onShare !== null) {
                onShare(type);
            }
        },
        [onShare],
    );

    const shareButtonProps = useMemo(
        () => ({
            url,
            onShareWindowClose: () => {
                if (onCancel !== null) {
                    onCancel();
                }
            },
        }),
        [url, onCancel],
    );

    const shareIconProps = useMemo(() => ({ size: 32, round: true }), []);

    return (
        <Modal>
            <ModalDialog
                title={
                    <>
                        <FormattedMessage defaultMessage="Share" description="Share modal title" />
                        {` ${title}`}
                    </>
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className,
                    },
                ])}
                onClickClose={onCancel}
            >
                <FacebookShareButton
                    {...shareButtonProps}
                    quote={title}
                    beforeOnClick={() => {
                        onShareButtonClick('facebook');
                    }}
                >
                    <FacebookIcon {...shareIconProps} />
                </FacebookShareButton>
                <FacebookMessengerShareButton
                    {...shareButtonProps}
                    appId={facebookAppId}
                    beforeOnClick={() => {
                        onShareButtonClick('facebook-messenger');
                    }}
                >
                    <FacebookMessengerIcon {...shareIconProps} />
                </FacebookMessengerShareButton>
                <TwitterShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('twitter');
                    }}
                >
                    <TwitterIcon {...shareIconProps} />
                </TwitterShareButton>
                <LinkedinShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('linkedin');
                    }}
                >
                    <LinkedinIcon {...shareIconProps} />
                </LinkedinShareButton>
                <WhatsappShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('whatsapp');
                    }}
                >
                    <WhatsappIcon {...shareIconProps} />
                </WhatsappShareButton>
                <RedditShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('reddit');
                    }}
                >
                    <RedditIcon {...shareIconProps} />
                </RedditShareButton>
                <TumblrShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('tumblr');
                    }}
                >
                    <TumblrIcon {...shareIconProps} />
                </TumblrShareButton>
                <EmailShareButton
                    {...shareButtonProps}
                    subject={title}
                    beforeOnClick={() => {
                        onShareButtonClick('email');
                    }}
                >
                    <EmailIcon {...shareIconProps} />
                </EmailShareButton>
            </ModalDialog>
        </Modal>
    );
};

ShareStoryModal.propTypes = propTypes;
ShareStoryModal.defaultProps = defaultProps;

export default ShareStoryModal;
