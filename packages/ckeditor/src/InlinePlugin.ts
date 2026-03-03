import { Plugin } from '@ckeditor/ckeditor5-core';

export default class InlinePlugin extends Plugin {
    init() {
        this.editor.editing.view.document.on(
            'enter',
            (evt, data) => {
                data.preventDefault();
                evt.stop();

                if (data.isSoft) {
                    this.editor.execute('enter');
                    this.editor.editing.view.scrollToTheSelection();

                    return;
                }

                this.editor.execute('shiftEnter');
                this.editor.editing.view.scrollToTheSelection();
            },
            { priority: 'high' },
        );

        this.editor.conversion
            // .for('downcast')
            .elementToElement({
                model: 'paragraph',
                view: 'span',
                converterPriority: 'high',
            });
    }
}
