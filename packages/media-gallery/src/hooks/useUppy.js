import { useMemo, useEffect } from 'react';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import Dropbox from '@uppy/dropbox';
import Webcam from '@uppy/webcam';
import Facebook from '@uppy/facebook';
import Instagram from '@uppy/instagram';
import GoogleDrive from '@uppy/google-drive';
import French from '@uppy/locales/lib/fr_FR';

const defaultAllowedFileTypes = ['image/*', 'video/*', 'audio/*'];
const useUppy = ({
    meta,
    maxNumberOfFiles = 5,
    allowedFileTypes = defaultAllowedFileTypes,
    autoProceed = false,
    locale = French,
    transloaditKey = 'ff04b47847354297b1bf5ce4956dcd16',
    templateId = 'a929c53948f94a91b76140ef1a11bac0',
    waitForEncoding = true,
    onComplete = null,
} = {}) => {
    const uppy = useMemo(() => {
        const newUppy = Uppy({
            meta,
            restrictions: { maxNumberOfFiles, allowedFileTypes },
            autoProceed,
            locale,
        })
            .use(Transloadit, {
                params: {
                    auth: { key: transloaditKey },
                    template_id: templateId,
                },
                waitForEncoding,
            })
            .use(Webcam, {
                id: 'webcam',
                companionUrl: Transloadit.COMPANION,
                companionAllowedHosts: Transloadit.COMPANION_PATTERN,
            })
            .use(Facebook, {
                id: 'facebook',
                companionUrl: Transloadit.COMPANION,
                companionAllowedHosts: Transloadit.COMPANION_PATTERN,
            })
            .use(Instagram, {
                id: 'instagram',
                companionUrl: Transloadit.COMPANION,
                companionAllowedHosts: Transloadit.COMPANION_PATTERN,
            })
            .use(Dropbox, {
                id: 'dropbox',
                companionUrl: Transloadit.COMPANION,
                companionAllowedHosts: Transloadit.COMPANION_PATTERN,
            })
            .use(GoogleDrive, {
                id: 'google-drive',
                companionUrl: Transloadit.COMPANION,
                companionAllowedHosts: Transloadit.COMPANION_PATTERN,
            });
        return newUppy;
    }, [
        meta,
        maxNumberOfFiles,
        allowedFileTypes,
        autoProceed,
        locale,
        transloaditKey,
        templateId,
        waitForEncoding,
    ]);

    useEffect(() => {
        if (onComplete !== null) {
            uppy.on('complete', onComplete);
        }
        return () => {
            if (onComplete !== null) {
                uppy.off('complete', onComplete);
            }
        };
    }, [uppy, onComplete]);

    useEffect(() => {
        return () => {
            uppy.close();
        };
    }, [uppy]);

    return uppy;
};

export default useUppy;
