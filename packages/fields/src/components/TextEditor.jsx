/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import { InlinePlugin, MarkerPlugin } from '@micromag/ckeditor';
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
    textStyle: PropTypes.shape({}),
    editorConfig: PropTypes.shape({}),
};

const defaultProps = {
    value: null,
    size: null,
    className: null,
    onChange: null,
    inline: false,
    withHighlightColors: false,
    textStyle: null,
    editorConfig: {
        toolbar: ['bold', 'italic', 'highlight', '|', 'link'],
        link: {
            addTargetToExternalLinks: true,
        },
    },
};

const TextEditorField = ({
    value,
    size,
    className,
    textStyle,
    editorConfig,
    inline,
    withHighlightColors,
    onChange,
}) => {
    const { locale } = useIntl();
    const { highlight: highlightStyle = null, link: linkStyle = null } = textStyle || {};
    const Editor = useCKEditor();
    const getColors = useGetColors();
    const colors = useMemo(
        () => (withHighlightColors ? getColors() : null) || [],
        [withHighlightColors, getColors],
    );

    const id = useMemo(() => `editor-${uuidv4()}`, []);

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

    // console.log('Editor', Editor);

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
                    editor={Editor}
                    config={finalEditorConfig}
                    data={value || ''}
                    onReady={onEditorReady}
                    onChange={onEditorChange}
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
