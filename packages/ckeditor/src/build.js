// eslint-disable-next-line max-classes-per-file
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { InlineEditor as InlineEditorBase } from '@ckeditor/ckeditor5-editor-inline';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

// Keep all editors in the same file to avoid ckeditor duplicated modules in build
import { fullPlugins } from './plugins';

class NormalEditor extends InlineEditorBase {}

NormalEditor.builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link];
NormalEditor.defaultConfig = {};

class FullEditor extends ClassicEditorBase {}

FullEditor.builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link, ...fullPlugins];

FullEditor.defaultConfig = {
    mediaEmbed: {
        previewsInData: true,
    },
};

export { NormalEditor, FullEditor };
