import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';

class InlineEditor extends InlineEditorBase {}

InlineEditor.builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link];

export default InlineEditor;

// InlineEditor.defaultConfig = {
//     toolbar: {
//         items: ['bold', 'italic', 'highlight', '|', 'link'],
//     },
//     language: 'en',
// };
