/* eslint-disable jsx-a11y/control-has-associated-label */

/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { getCSRFHeaders } from '@folklore/fetch';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { Modal, ModalDialog as Dialog, Button } from '@micromag/core/components';
import { useUppyConfig } from '@micromag/core/contexts';

import EditorField from './TextEditor';
import TextElement from './TextElement';

import styles from '../styles/text-modal.module.scss';

const propTypes = {
    title: PropTypes.string,
    value: PropTypes.shape({
        body: PropTypes.string,
    }),
    editorConfig: PropTypes.shape({}),
    inline: PropTypes.bool,
    withHighlightColors: PropTypes.bool,
    onChange: PropTypes.func,
    onRequestClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    value: null,
    editorConfig: null,
    inline: false,
    withHighlightColors: false,
    onChange: null,
    onRequestClose: null,
    className: null,
};

const TextModal = ({
    title,
    value,
    editorConfig,
    inline,
    withHighlightColors,
    className,
    onRequestClose,
    onChange,
    ...props
}) => {
    const [modalOpen, setModalOpen] = useState();

    const { locale } = useIntl();
    const { xhr } = useUppyConfig();
    const { endpoint: xhrEndpoint = null } = xhr || {};

    const previewEditorConfig = useMemo(
        () => ({
            extraPlugins: [],
            highlight: {
                options: [],
            },
            language: locale,
        }),
        [editorConfig, inline, locale],
    );

    const finalEditorConfig = useMemo(
        () => ({
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
        }),
        [editorConfig, inline, locale],
    );

    const bodyValue =
        value !== null && typeof value.body !== 'undefined' ? value.body || null : null;

    const onBodyChange = useCallback(
        (newBody) => {
            const newValue = {
                ...value,
                body: newBody,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    const onOpen = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setModalOpen(true);
        },
        [setModalOpen],
    );

    const onClose = useCallback(
        (e) => {
            setModalOpen(false);
            if (onRequestClose !== null) {
                onRequestClose(e);
            }
        },
        [setModalOpen, onRequestClose],
    );

    return (
        <>
            <button type="button" className={styles.previewButton} onClick={onOpen}>
                <TextElement
                    className={styles.preview}
                    inline
                    value={value}
                    disabled
                    editorConfig={previewEditorConfig}
                />
            </button>
            {modalOpen ? (
                <Modal>
                    <Dialog
                        title={
                            title || (
                                <FormattedMessage
                                    defaultMessage="Edit text"
                                    description="Modal title"
                                />
                            )
                        }
                        className={classNames([
                            styles.dialog,
                            {
                                [className]: className,
                            },
                        ])}
                        bodyClassName={styles.dialogBody}
                        onClickClose={onClose}
                        footer={
                            <div className="p-2">
                                <Button className={styles.close} theme="primary" onClick={onClose}>
                                    <FormattedMessage
                                        defaultMessage="Close"
                                        description="Button label"
                                    />
                                </Button>
                            </div>
                        }
                    >
                        <EditorField
                            {...props}
                            value={bodyValue}
                            onChange={onBodyChange}
                            className={styles.editor}
                            inline={inline}
                            withHighlightColors={withHighlightColors}
                            withFullEditor
                            editorConfig={finalEditorConfig}
                        />
                    </Dialog>
                </Modal>
            ) : null}
        </>
    );
};

TextModal.propTypes = propTypes;
TextModal.defaultProps = defaultProps;

export default TextModal;
