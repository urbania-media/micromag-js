import { getCSRFHeaders } from '@folklore/fetch';
import classNames from 'classnames';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Dialog from '@panneau/modal-dialog';
import { useUppyConfig } from '@panneau/uppy';

import { TextElement as TextElementType } from '@micromag/core';

import EditorField, { TextEditorFieldProps } from './TextEditor';
import TextElement from './TextElement';

import styles from '../styles/text-modal.module.css';

interface TextModalProps extends Omit<TextEditorFieldProps, 'value' | 'onChange' | 'disabled'> {
    title?: string | null;
    value?: TextElementType | null;
    editorConfig?: Record<string, unknown> | null;
    inline?: boolean;
    withHighlightColors?: boolean;
    disabled?: boolean;
    onChange?: ((newValue: TextElementType | null) => void) | null;
    onRequestClose?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function TextModal({
    title = null,
    value = null,
    editorConfig = null,
    inline = false,
    withHighlightColors = false,
    className = null,
    onRequestClose = null,
    onChange = null,
    disabled = false,
    ...props
}: TextModalProps) {
    const { locale } = useIntl();
    const { xhr } = useUppyConfig();
    const { endpoint: xhrEndpoint = null } = xhr || {};

    const previewEditorConfig = {
        extraPlugins: [],
        highlight: {
            options: [],
        },
        language: locale,
    };

    const finalEditorConfig = {
        toolbar: [
            'heading2',
            'heading3',
            'paragraph',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'blockQuote',
            'bulletedList',
            'numberedList',
            'uploadImage',
            // 'mediaEmbed',
        ],
        link: {
            addTargetToExternalLinks: true,
        },
        simpleUpload: {
            uploadUrl: xhrEndpoint || null,
            withCredentials: true,
            headers: {
                // 'X-CSRF-TOKEN': 'CSRF-Token',
                // Authorization: 'Bearer <JSON Web Token>',
                ...getCSRFHeaders(),
            },
        },
        ...editorConfig,
    };

    const bodyValue =
        value !== null && typeof value.body !== 'undefined' ? value.body || null : null;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const onBodyChange = (newBody) => {
        const newValue = {
            ...value,
            body: newBody,
        };
        if (onChange !== null) {
            onChange(newValue);
        }
    };

    const onOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setModalOpen(true);
        setModalVisible(true);
    };

    const requestModalClose = () => {
        setModalVisible(false);
    };

    const onModalClosed = () => {
        setModalOpen(false);
        if (onRequestClose !== null) {
            onRequestClose();
        }
    };

    return (
        <>
            <button
                type="button"
                disabled={disabled}
                className={classNames([styles.previewButton, className])}
                onClick={onOpen}
            >
                <TextElement inline value={value} disabled editorConfig={previewEditorConfig} />
            </button>
            {modalOpen ? (
                <Dialog
                    id="text-field-modal"
                    title={
                        title || (
                            <FormattedMessage
                                defaultMessage="Edit text"
                                description="Modal title"
                            />
                        )
                    }
                    size="xl"
                    visible={modalVisible}
                    requestClose={requestModalClose}
                    onClosed={onModalClosed}
                    className="modal-fullscreen-lg-down"
                >
                    <EditorField
                        {...props}
                        value={bodyValue}
                        onChange={onBodyChange}
                        className={classNames([styles.editor, 'h-100'])}
                        inline={inline}
                        withHighlightColors={withHighlightColors}
                        withFullEditor
                        editorConfig={finalEditorConfig}
                    />
                </Dialog>
            ) : null}
        </>
    );
}

export default TextModal;
