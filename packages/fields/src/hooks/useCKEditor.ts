import { useEffect, useState } from 'react';

/**
 * Locale loader
 */
let packageCache = null;
const useCKEditor = () => {
    const [loadedPackage, setLoadedPackage] = useState(packageCache);

    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }

        Promise.all([import('@micromag/ckeditor/build'), import('@panneau/ckeditor/build')]).then(
            (exports) => {
                console.log(exports);
                // packageCache = defaultExport;
                // if (!canceled) {
                //     setLoadedPackage(packageCache);
                // }
            },
        );

        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage || {};
};

export default useCKEditor;
