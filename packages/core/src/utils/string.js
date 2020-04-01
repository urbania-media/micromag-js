import { pascalCase, snakeCase } from 'change-case';
import slugify from 'slugify';

export { pascalCase, snakeCase };

export const slug = str =>
    slugify(snakeCase(str), {
        lower: true,
    });
