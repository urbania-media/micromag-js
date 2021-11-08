/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import useCKEditorPackage from '../hooks/useCKEditorPackage';

import styles from '../styles/text-editor.module.scss';

const propTypes = {
    value: PropTypes.string,
    size: MicromagPropTypes.formControlSize,
    className: PropTypes.string,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    textStyle: PropTypes.shape({}),
    editorConfig: PropTypes.shape({}),
};

const defaultProps = {
    value: null,
    size: null,
    className: null,
    onChange: null,
    inline: false,
    textStyle: null,
    editorConfig: {
        toolbar: ['bold', 'italic', 'highlight', '|', 'link'],
        // language: 'fr',
        link: {
            addTargetToExternalLinks: true,
        },
    },
};

const TextEditorField = ({ value, size, className, textStyle, editorConfig, inline, onChange }) => {
    const { locale } = useIntl();
    const { highlightColor = null } = textStyle || {};
    const Editor = useCKEditorPackage({
        inline,
    });

    // const CKEditor = useCKEditor();
    // const InlineEditor = useCKEditorInline();

    const finalEditorConfig = useMemo(
        () => ({
            ...editorConfig,
            highlight: {
                options: [
                    {
                        model: 'marker',
                        title: 'Marker',
                        type: 'marker',
                        color: highlightColor,
                    },
                ],
            },
            language: locale,
        }),
        [editorConfig, locale, highlightColor],
    );

    const onEditorReady = useCallback(() => {
        // eslint-disable
    }, [onChange]);

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
                    [styles[`size-${size}`]]: size !== null,
                    [className]: className !== null,
                },
            ])}
            id="editor-test"
        >
            {Editor !== null ? (
                <CKEditor
                    editor={Editor}
                    config={finalEditorConfig}
                    data={`<h1>${value || ''}</h1>`}
                    onReady={onEditorReady}
                    onChange={onEditorChange}
                />
            ) : null}
            <style type="text/css">{`
                ${
                    highlightColor !== null
                        ? `
                #editor-test .ck-content mark {
                    background-color: ${highlightColor.color};
                }
                `
                        : null
                }

            `}</style>
        </div>
    );
};

TextEditorField.propTypes = propTypes;
TextEditorField.defaultProps = defaultProps;

export default TextEditorField;
