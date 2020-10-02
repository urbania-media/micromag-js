import slugify from 'slugify';
import snakeCase from './snakeCase';

const slug = str =>
    slugify(snakeCase(str), {
        lower: true,
    });

export default slug;
