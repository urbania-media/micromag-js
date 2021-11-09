/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { HighlightStyle, LinkStyle } from '@micromag/core/components';
import { useGetColors } from '@micromag/core/contexts';
import { getColorAsString, getStyleFromHighlight, getStyleFromLink } from '@micromag/core/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import useCKEditor from '../hooks/useCKEditor';
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
    const { highlight: highlightStyle = null, link: linkStyle = null } = textStyle || {};
    const Editor = useCKEditor({
        inline,
    });
    const getColors = useGetColors();
    const colors = useMemo(() => getColors() || [], [getColors]);

    const id = useMemo(() => `editor-${uuidv4()}`, []);

    const markers = useMemo(() =>
        colors.map((color, index) => ({
            model: `marker_${index}`,
            color: getColorAsString(color),
        })),
    );

    const markerPlugin = useCallback((editor) => {
        editor.conversion.attributeToElement({
            model: {
                key: 'highlight',
                values: markers.map(({ model }) => model),
            },
            view: markers.reduce(
                (map, { model, color }) => ({
                    ...map,
                    [model]: {
                        name: 'mark',
                        styles: {
                            'background-color': color,
                            'box-shadow': `0.05em 0px 0px ${color}, -0.05em 0px 0px ${color}`,
                        },
                    },
                }),
                {},
            ),
        });
    }, []);

    const finalEditorConfig = useMemo(
        () => ({
            ...editorConfig,
            extraPlugins: [markerPlugin],
            highlight: {
                options: [
                    {
                        model: 'marker',
                        title: 'Marker',
                        type: 'marker',
                    },
                    ...markers.map(({ model, color }) => ({
                        model,
                        type: 'marker',
                        color,
                    })),
                ],
            },
            language: locale,
        }),
        [editorConfig, markerPlugin, locale],
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
