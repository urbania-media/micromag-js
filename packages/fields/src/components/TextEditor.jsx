/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import styles from '../styles/text-editor.module.scss';

const propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    editorConfig: PropTypes.shape({}),
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    editorConfig: {
        toolbar: ['bold', 'italic', '|', 'link', 'blockQuote', '|', 'heading'],
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

const TextEditorField = ({ value, className, editorConfig, onChange }) => {
    const onEditorChange = useCallback(
        (event, editor) => {
            const data = editor.getData();
            if (onChange !== null) {
                onChange(data);
            }
        },
        [onChange],
    );
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={value || ''}
                onChange={onEditorChange}
            />
        </div>
    );
};

TextEditorField.propTypes = propTypes;
TextEditorField.defaultProps = defaultProps;

export default TextEditorField;
