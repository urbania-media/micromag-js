import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { InlineEditor as InlineEditorBase } from '@ckeditor/ckeditor5-editor-inline';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

class NormalEditor extends InlineEditorBase {}

NormalEditor.builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link];

NormalEditor.defaultConfig = {};

export default NormalEditor;
