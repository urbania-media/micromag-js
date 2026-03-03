import isNumber from 'lodash/isNumber';
import { kebabCase } from 'change-case';

const convertStyleToString = style =>
    style !== null
        ? Object.keys(style)
              .map(
                  key =>
                      `${kebabCase(key)}:${isNumber(style[key]) ? `${style[key]}px` : style[key]};`,
              )
              .join('\n')
        : '';

export default convertStyleToString;
