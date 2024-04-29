import { useEffect, useMemo, useState } from 'react';

/**
 * Locale loader
 */
const packageCache = { build: null, inline: null };
const useCKEditor = ({ inline = false } = {}) => {
    const [packages, setLoadedPackage] = useState({
        ...packageCache,
    });
    const key = useMemo(() => (inline ? 'inline' : 'build'), [inline]);
    const loadedPackage = packages[key];

    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }

        import('@panneau/ckeditor/build').then(
            ({ Editor = null, InlineEditor = null, default: defaultExport }) => {
                const { Editor: defaultEditor = null, defaultInlineEditor = null } =
                    defaultExport || {};

                console.log('ed', { Editor, InlineEditor, defaultExport });

                packageCache[key] =
                    key === 'inline'
                        ? defaultInlineEditor || InlineEditor
                        : defaultEditor || Editor;
                if (!canceled) {
                    setLoadedPackage({
                        [key]: packageCache[key],
                    });
                }
            },
        );

        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage, key]);
    return loadedPackage;
};

export default useCKEditor;
