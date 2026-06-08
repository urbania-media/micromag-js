import isArray from 'lodash-es/isArray';

const getMediaFilesAsArray = (files) =>
    files !== null && isArray(files)
        ? files
        : Object.keys(files || {}).reduce(
              (newFiles, key) => [
                  ...newFiles,
                  {
                      handle: key,
                      ...files[key],
                  },
              ],
              [],
          );

export default getMediaFilesAsArray;
