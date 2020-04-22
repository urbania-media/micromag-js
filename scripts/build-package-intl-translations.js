const path = require('path');
const buildIntlTranslations = require('./lib/buildIntlTranslations');

const MESSAGES_PATTERN = path.join(process.env.PWD, './intl/messages/**/*.json');
const LANG_FILE = path.join(process.env.PWD, './intl/locale/en.json');

buildIntlTranslations(MESSAGES_PATTERN, LANG_FILE);
