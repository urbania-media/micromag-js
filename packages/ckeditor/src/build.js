// eslint-disable-next-line max-classes-per-file
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { InlineEditor as InlineEditorBase } from '@ckeditor/ckeditor5-editor-inline';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading, HeadingButtonsUI } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { ImageInline, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph, ParagraphButtonUI } from '@ckeditor/ckeditor5-paragraph';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

// Keep all editors in the same file to avoid ckeditor duplicated modules in build

class NormalEditor extends InlineEditorBase {}
// static builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link];
// static defaultConfig = {};

NormalEditor.builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link];
NormalEditor.defaultConfig = {};

class FullEditor extends ClassicEditorBase {}

FullEditor.builtinPlugins = [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Highlight,
    Link,
    Heading,
    ImageInline,
    ImageToolbar,
    ImageUpload,
    SimpleUploadAdapter,
    MediaEmbed,
    BlockQuote,
    HeadingButtonsUI,
    ParagraphButtonUI,
    List,
];

FullEditor.defaultConfig = {
    mediaEmbed: {
        previewsInData: true,
    },
};

export default { NormalEditor, FullEditor };
