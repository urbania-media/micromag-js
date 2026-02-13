import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';

import React from 'react';

import ScreenNode from './ScreenNode';
import StoryNode from './StoryNode';

const extensions = [StoryNode, ScreenNode, Paragraph, Text];

function Editor() {
    const editor = useEditor({
        extensions,
        content: {
            type: 'doc',
            content: [
                {
                    type: 'screen',
                    attrs: {
                        type: 'video',
                    },
                },
                {
                    type: 'screen',
                    attrs: {
                        type: 'video',
                    },
                },
            ],
        },
    });
    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
}

export default Editor;
