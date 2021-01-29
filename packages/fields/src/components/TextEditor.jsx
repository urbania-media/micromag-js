/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import useCKEditor from '../hooks/useCKEditor';
import useCKEditorInline from '../hooks/useCKEditorInline';

import styles from '../styles/text-editor.module.scss';

const propTypes = {
    value: PropTypes.string,
    size: MicromagPropTypes.formControlSize,
    className: PropTypes.string,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    editorConfig: PropTypes.shape({}),
};

const defaultProps = {
    value: null,
    size: null,
    className: null,
    onChange: null,
    inline: false,
    editorConfig: {
        toolbar: ['bold', 'italic', '|', 'link'],
        language: 'fr',
        link: {
            addTargetToExternalLinks: true,
        },
    },
};

const TextEditorField = ({ value, size, className, editorConfig, inline, onChange }) => {
    const { locale } = useIntl();
    const CKEditor = useCKEditor();
    const InlineEditor = useCKEditorInline();

    const finalEditorConfig = useMemo(
        () => ({
            ...editorConfig,
            language: locale,
        }),
        [editorConfig, locale],
    );

    const onEditorReady = useCallback(
        (editor) => {
            if (inline) {
                // editor.model.schema.extend('$root', {
                //     isBlock: true,
                //     isLimit: true,
                // });
                // editor.model.schema.extend('$block', {
                //     isLimit: true,
                // });
                // editor.model.schema.extend('paragraph', {
                //     isLimit: true,
                // });
                // editor.conversion.for('downcast').elementToElement({
                //     model: 'paragraph',
                //     view: 'span',
                //     // view: (element, { writer }) => writer.createText(),
                //     converterPriority: 'high',
                // });
            }
        },
        [inline],
    );

    const onEditorChange = useCallback(
        (event, editor) => {
            const data = editor.getData();
            if (onChange !== null) {
                onChange(data);
            }
        },
        [onChange, inline],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[`size-${size}`]]: size !== null,
                    [className]: className !== null,
                },
            ])}
        >
            {CKEditor !== null && InlineEditor !== null ? (
                <CKEditor
                    editor={InlineEditor}
                    config={finalEditorConfig}
                    data={value || ''}
                    onReady={onEditorReady}
                    onChange={onEditorChange}
                />
            ) : null}
        </div>
    );
};

TextEditorField.propTypes = propTypes;
TextEditorField.defaultProps = defaultProps;

export default TextEditorField;
