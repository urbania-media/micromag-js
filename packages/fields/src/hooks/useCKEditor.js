import { useEffect, useMemo, useState } from 'react';

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

        import('@micromag/ckeditor/build').then(({ default: defaultExport }) => {
            packageCache = defaultExport;
            if (!canceled) {
                setLoadedPackage(packageCache);
            }
        });

        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage || {};
};

export default useCKEditor;
