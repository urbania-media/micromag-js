/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { InlinePlugin, MarkerPlugin } from '@micromag/ckeditor';
import { Modal, ModalDialog as Dialog, Button } from '@micromag/core/components';
import { useGetColors } from '@micromag/core/contexts';
import { getColorAsString } from '@micromag/core/utils';

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
    const getColors = useGetColors();
    const colors = useMemo(
        () => (withHighlightColors ? getColors() : null) || [],
        [withHighlightColors, getColors],
    );

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
            ...editorConfig,
            extraPlugins: [MarkerPlugin, inline ? InlinePlugin : null].filter((it) => it !== null),
            highlight: {
                options: [
                    {
                        model: 'marker',
                        title: 'Marker',
                        type: 'marker',
                    },
                    ...colors.map((color, index) => ({
                        model: `marker_${index}`,
                        type: 'marker',
                        color: getColorAsString(color),
                    })),
                ],
            },
            language: locale,
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
            <button className={styles.previewButton} type="button" onClick={onOpen}>
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
                            // editorConfig={finalEditorConfig}
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
