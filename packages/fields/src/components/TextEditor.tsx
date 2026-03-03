/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames';
import React, { useCallback, useId, useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { FormControlSize } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import { useGetColors } from '@micromag/core/contexts';
import { getColorAsString, getStyleFromHighlight, getStyleFromLink } from '@micromag/core/utils';

import useCKEditor from '../hooks/useCKEditor';

import styles from '../styles/text-editor.module.css';

interface TextEditorFieldProps {
    value?: string;
    size?: FormControlSize;
    className?: string;
    onChange?: (...args: unknown[]) => void;
    inline?: boolean;
    withHighlightColors?: boolean;
    withFullEditor?: boolean;
    withoutLink?: boolean;
    textStyle?: Record<string, unknown>;
    editorConfig?: Record<string, unknown>;
    onFocus?: (...args: unknown[]) => void;
    disabled?: boolean;
}

function TextEditorField({
    value = null,
    size = null,
    className = null,
    textStyle = null,
    editorConfig = {
        toolbar: ['bold', 'italic', 'superscript', 'highlight', '|', 'link', 'blockquote'],
        link: {
            addTargetToExternalLinks: true,
        },
    },
    inline = false,
    withHighlightColors = false,
    withFullEditor = false,
    withoutLink = false,
    onChange = null,
    onFocus = null,
    disabled = false,
}) {
    const { locale } = useIntl();
    const { highlight: highlightStyle = null, link: linkStyle = null } = textStyle || {};
    const {
        Editor = null,
        InlineEditor = null,
        defaultPlugins = [],
        fullPlugins = [],
        inlinePlugins = [],
    } = useCKEditor();

    const getColors = useGetColors();
    const colors = useMemo(
        () => (withHighlightColors ? getColors() : null) || [],
        [withHighlightColors, getColors],
    );

    const defaultEditorConfig = useMemo(() => {
        if (withoutLink) {
            const { toolbar: items = null } = editorConfig || {};
            return {
                ...editorConfig,
                toolbar: (items || []).filter((it) => it !== 'link' && it !== '|'),
            };
        }
        return editorConfig;
    }, [editorConfig, withoutLink]);

    const uniqueId = useId();
    const id = `editor-${uniqueId}`;

    const finalEditorConfig = useMemo(
        () => ({
            licenseKey: 'GPL',
            extraPlugins: [
                ...defaultPlugins,
                ...(inline ? inlinePlugins : []),
                ...(withFullEditor ? fullPlugins : []),
            ].filter((it) => it !== null),
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
            toolbar: {
                items: [
                    'undo',
                    'redo',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'superscript',
                    '|',
                    'link',
                    'uploadImage',
                    'insertTable',
                    'mediaEmbed',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'outdent',
                    'indent',
                ],
            },
            language: locale,
            ...defaultEditorConfig,
            mediaEmbed: {
                previewsInData: true,
            },
        }),
        [
            defaultEditorConfig,
            inline,
            locale,
            withFullEditor,
            defaultPlugins,
            inlinePlugins,
            fullPlugins,
        ],
    );

    // console.log({
    //     finalEditorConfig,
    // })

    const onEditorReady = useCallback(() => {}, []);

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
            id={id}
            className={classNames([
                styles.container,
                {
                    [styles[`size-${size}`]]: size !== null,
                    [className]: className !== null,
                },
            ])}
        >
            {Editor !== null ? (
                <CKEditor
                    editor={!withFullEditor ? InlineEditor : Editor}
                    config={finalEditorConfig}
                    data={value || ''}
                    onReady={onEditorReady}
                    onChange={onEditorChange}
                    onFocus={onFocus}
                    disabled={disabled}
                />
            ) : null}
            {linkStyle !== null ? (
                <LinkStyle
                    selector={`#${CSS.escape(id)} .ck-content`}
                    style={getStyleFromLink(linkStyle)}
                />
            ) : null}
            {highlightStyle !== null ? (
                <HighlightStyle
                    selector={`#${CSS.escape(id)} .ck-content`}
                    style={getStyleFromHighlight(highlightStyle)}
                />
            ) : null}
        </div>
    );
}

export default TextEditorField;
