import isString from 'lodash/isString';

function addNonBreakingSpaces(text) {
    return isString(text)
        ? text.replace(/«\s/g, '« ').replace(/\s»/g, ' »').replace(/\s:\s/g, ' : ')
        : text;
}

export default addNonBreakingSpaces;
