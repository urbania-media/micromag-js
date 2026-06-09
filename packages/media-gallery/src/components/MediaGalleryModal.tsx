import classNames from 'classnames';
import { ForwardedRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Dialog, { DialogModalProps } from '@panneau/modal-dialog';

import MediaGallery, { MediaGalleryProps } from './MediaGallery';

export interface MediaGalleryModalProps extends Omit<DialogModalProps, 'id'>, MediaGalleryProps {
    id?: string | null;
    autoClose?: boolean;
    withoutCloseOnComplete?: boolean;
    formRef?: ForwardedRef<HTMLFormElement> | null;
}

function MediaGalleryModal({
    id = null,
    title = null,
    size = 'xl',
    visible = null,
    autoClose = true,
    multiple = false,
    requestClose: customRequestClose = null,
    onClosed = null,
    className = null,
    value: initialValue,
    onChange = null,
    ...props
}: MediaGalleryModalProps) {
    const [opened, setOpened] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [value, setValue] = useState(initialValue);
    const requestClose =
        customRequestClose ??
        (() => {
            setOpened(false);
        });
    const onGalleryChange = (newValue) => {
        if (!autoClose || multiple) {
            setValue(newValue);
        } else if (onChange !== null) {
            onChange(newValue);
        }
        if (autoClose && !multiple) {
            requestClose();
        }
    };
    const onFormOpen = () => {
        setFormOpen(true);
    };
    const onFormClose = () => {
        setFormOpen(false);
    };
    const onClickSubmit = () => {
        if (onChange !== null) {
            onChange(value);
        }
        requestClose();
    };
    return (
        <Dialog
            id={id ?? 'media-gallery'}
            title={
                title || <FormattedMessage defaultMessage="Select media" description="Page title" />
            }
            size={size}
            visible={visible ?? opened}
            withCancelButton={!formOpen}
            withSubmitButton={!formOpen}
            requestClose={requestClose}
            onClosed={onClosed}
            onClickSubmit={onClickSubmit}
            className={classNames(['modal-fullscreen-lg-down', className])}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Confirm selection" description="Button label" />
            }
        >
            <MediaGallery
                isPicker
                multiple={multiple}
                value={value}
                onChange={onGalleryChange}
                onMediaFormOpen={onFormOpen}
                onMediaFormClose={onFormClose}
                {...props}
            />
        </Dialog>
    );
}

export default MediaGalleryModal;
