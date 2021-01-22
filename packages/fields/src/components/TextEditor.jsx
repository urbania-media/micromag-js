/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

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
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading2', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading4' },
            ],
        },
        link: {
            addTargetToExternalLinks: true,
        },
    },
};

const TextEditorField = ({ value, size, className, editorConfig, inline, onChange }) => {
    const { locale } = useIntl();

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
                editor.model.schema.extend('$root', {
                    isBlock: true,
                    isLimit: true,
                });
                editor.model.schema.extend('$block', {
                    isLimit: true,
                });
                editor.model.schema.extend('paragraph', {
                    isLimit: true,
                });
                editor.conversion.for('upcast').elementToElement({
                    model: (viewElement, { writer }) => {
                        console.log(viewElement);
                        return writer.createElement('paragraph');
                    },
                    view: /.+/,
                    converterPriority: 'low',
                });
                console.log(editor.model.schema);
            }
        },
        [inline],
    );

    const onEditorChange = useCallback(
        (event, editor) => {
            const data = editor.getData();
            // const finalData = inline ? data.replace(/^<p>(.*)<\/p>$/, '$1') : data;
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
            <CKEditor
                editor={InlineEditor}
                config={finalEditorConfig}
                data={value || ''}
                onReady={onEditorReady}
                onChange={onEditorChange}
            />
        </div>
    );
};

TextEditorField.propTypes = propTypes;
TextEditorField.defaultProps = defaultProps;

export default TextEditorField;
