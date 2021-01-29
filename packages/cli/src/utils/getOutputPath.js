import path from 'path';

const getOutputPath = (output, filename) => {
    if (output !== null) {
        const fileExt = path.extname(filename);
        const outputExt = path.extname(output);
        if (fileExt && outputExt === '') {
            return path.join(output, filename);
        }
        return output;
    }

    return path.join(process.cwd(), `./${filename}`);
};
export default getOutputPath;
