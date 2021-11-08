import { useState, useEffect } from 'react';

/**
 * Locale loader
 */
let packageCache = {
    inline: null,
    normal: null,
};
const useCKEditor = ({ inline = false } = {}) => {
    // transport
    const [{ package: loadedPackage }, setLoadedPackage] = useState({
        package: packageCache[inline ? 'inline' : 'normal'],
    });
    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }
        (inline ? import('@micromag/ckeditor/inline') : import('@micromag/ckeditor')).then(
            ({ default: Editor }) => {
                packageCache = {
                    ...packageCache,
                    [inline ? 'inline' : 'normal']: Editor,
                };
                if (!canceled) {
                    setLoadedPackage({
                        package: Editor,
                    });
                }
            },
        );
        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage;
};

export default useCKEditor;
