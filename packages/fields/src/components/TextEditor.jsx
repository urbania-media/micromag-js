/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import { useGetColors } from '@micromag/core/contexts';
import { getColorAsString, getStyleFromHighlight, getStyleFromLink } from '@micromag/core/utils';

import useCKEditor from '../hooks/useCKEditor';

import styles from '../styles/text-editor.module.scss';

const propTypes = {
    value: PropTypes.string,
    size: MicromagPropTypes.formControlSize,
    className: PropTypes.string,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    withHighlightColors: PropTypes.bool,
    withFullEditor: PropTypes.bool,
    withoutLink: PropTypes.bool,
    textStyle: PropTypes.shape({}),
    editorConfig: PropTypes.shape({}),
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
};

const defaultProps = {
    value: null,
    size: null,
    className: null,
    onChange: null,
    inline: false,
    withHighlightColors: false,
    withFullEditor: false,
    withoutLink: false,
    textStyle: null,
    editorConfig: {
        toolbar: ['bold', 'italic', 'highlight', '|', 'link', 'blockquote'],
        link: {
            addTargetToExternalLinks: true,
        },
    },
    onFocus: null,
    disabled: false,
};

const TextEditorField = ({
    value,
    size,
    className,
    textStyle,
    editorConfig,
    inline,
    withHighlightColors,
    withFullEditor,
    withoutLink,
    onChange,
    onFocus,
    disabled,
}) => {
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

    const id = useMemo(() => `editor-${uuidv4()}`, []);

    const finalEditorConfig = useMemo(
        () => ({
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
            className={classNames([
                styles.container,
                {
                    [styles[`size-${size}`]]: size !== null,
                    [className]: className !== null,
                },
            ])}
            id={id}
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
                <LinkStyle selector={`#${id} .ck-content`} style={getStyleFromLink(linkStyle)} />
            ) : null}
            {highlightStyle !== null ? (
                <HighlightStyle
                    selector={`#${id} .ck-content`}
                    style={getStyleFromHighlight(highlightStyle)}
                />
            ) : null}
        </div>
    );
};

TextEditorField.propTypes = propTypes;
TextEditorField.defaultProps = defaultProps;

export default TextEditorField;
