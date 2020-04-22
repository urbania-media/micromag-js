'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var manager = _interopDefault(require('@micromag/intl'));

var messages = {
  "editor.buttons.edit": "Edit",
  "editor.buttons.screens": "Screens",
  "editor.buttons.view_screen": "View screen",
  "editor.modals.screen_types_title": "Add a screen",
  "editor.screen_name": "Screen {index}",
  "elements.text.schema.properties.text_style": "Text style",
  "elements.text.schema.title": "Text element",
  "screens.title.schema.properties.background": "Background",
  "screens.title.schema.properties.description": "Description",
  "screens.title.schema.properties.layout": "Layout",
  "screens.title.schema.properties.subtitle": "Subtitle",
  "screens.title.schema.properties.title": "Title",
  "screens.title.schema.title": "Title"
};

/* eslint-disable */
manager.addLocale('en', messages);
