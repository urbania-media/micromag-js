import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading, HeadingButtonsUI } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { ImageInline, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { ParagraphButtonUI } from '@ckeditor/ckeditor5-paragraph';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

import InlinePlugin from './InlinePlugin';
import MarkerPlugin from './MarkerPlugin';

export const defaultPlugins = [Highlight, MarkerPlugin];

export const inlinePlugins = [InlinePlugin];

export const fullPlugins = [
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
