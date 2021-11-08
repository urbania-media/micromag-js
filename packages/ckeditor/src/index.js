import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';

class NormalEditor extends InlineEditorBase {}

NormalEditor.builtinPlugins = [Essentials, Paragraph, Bold, Italic, Highlight, Link];

export default NormalEditor;

// InlineEditor.defaultConfig = {
//     toolbar: {
//         items: ['bold', 'italic', 'highlight', '|', 'link'],
//     },
//     language: 'en',
// };
