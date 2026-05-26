import type { TextElement as TextElementType } from '@micromag/core';

import TextField, { TextFieldProps } from './Text';
import EditorField, { TextEditorFieldProps } from './TextEditor';
import TextareaField, { TextareaFieldProps } from './Textarea';

interface BaseTextElementProps {
    value?: TextElementType | null;
    inline?: boolean;
    textOnly?: boolean;
    onChange?: ((newValue: TextElementType | null) => void) | null;
    disabled?: boolean;
}

interface InlineTextOnlyTextElementProps
    extends BaseTextElementProps, Partial<Omit<TextFieldProps, 'value' | 'onChange' | 'disabled'>> {
    inline: true;
    textOnly: true;
}

interface TextOnlyTextElementProps
    extends
        BaseTextElementProps,
        Partial<Omit<TextareaFieldProps, 'value' | 'onChange' | 'disabled'>> {
    inline: false;
    textOnly: true;
}

interface TextEditorTextElementProps
    extends
        BaseTextElementProps,
        Partial<Omit<TextEditorFieldProps, 'value' | 'onChange' | 'disabled'>> {
    textOnly?: false;
}

type TextElementProps =
    | InlineTextOnlyTextElementProps
    | TextOnlyTextElementProps
    | TextEditorTextElementProps;

function TextElement({
    value = null,
    onChange = null,
    inline = false,
    textOnly = false,
    disabled = false,
    ...props
}: TextElementProps) {
    const bodyValue = value !== null ? value.body || null : null;
    const textStyleValue = value !== null ? value.textStyle || null : null;
    const onBodyChange = (newBody) => {
        const newValue = {
            ...value,
            body: newBody,
        };
        if (onChange !== null) {
            onChange(newValue);
        }
    };

    if (textOnly) {
        return inline ? (
            <TextField
                {...(props as TextFieldProps)}
                value={bodyValue}
                onChange={onBodyChange}
                disabled={disabled}
            />
        ) : (
            <TextareaField
                {...(props as TextareaFieldProps)}
                value={bodyValue}
                onChange={onBodyChange}
                disabled={disabled}
            />
        );
    }

    return (
        <EditorField
            {...(props as TextEditorFieldProps)}
            inline={inline}
            textStyle={textStyleValue}
            value={bodyValue}
            onChange={onBodyChange}
            disabled={disabled}
        />
    );
}

export default TextElement;
