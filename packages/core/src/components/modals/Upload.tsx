// import classNames from 'classnames';
// import { DashboardModal } from '@uppy/react';
import isArray from 'lodash/isArray';
import React, { Suspense, useCallback, useEffect, useMemo } from 'react';

import { useUppy } from '@panneau/uppy';

const DashboardModal = React.lazy(() =>
    import('@uppy/react').then(({ DashboardModal: Component }) => ({ default: Component })),
);

interface UploadModalProps {
    type?: MediaType | unknown[];
    opened?: boolean;
    sources?: string[];
    onUploaded?: (...args: unknown[]) => void;
    onRequestClose?: (...args: unknown[]) => void;
}

function UploadModal({
    type = null,
    opened = false,
    sources = ['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive'],
    onUploaded = null,
    onRequestClose = null,
}: UploadModalProps) {
    const onUppyComplete = useCallback(
        (response) => {
            if (onUploaded !== null) {
                onUploaded(response);
            }
        },
        [onUploaded],
    );

    const fileTypes = useMemo(() => {
        if (isArray(type)) {
            return type
                .map((t) => (['image', 'video', 'audio'].indexOf(t) !== -1 ? `${t}/*` : null))
                .filter((t) => t !== null);
        }
        return ['image', 'video', 'audio'].indexOf(type) !== -1 ? [`${type}/*`] : null;
    }, [type]);

    const uppy = useUppy({
        onComplete: onUppyComplete,
        sources,
        allowedFileTypes: fileTypes !== null && fileTypes.length > 0 ? fileTypes : null,
    });

    useEffect(() => {
        if (uppy !== null && !opened) {
            uppy.cancelAll();
        }
    }, [uppy, opened]);

    return uppy !== null ? (
        <Suspense fallback={<div />}>
            <DashboardModal
                uppy={uppy}
                open={opened}
                closeAfterFinish
                onRequestClose={onRequestClose}
                plugins={sources}
            />
        </Suspense>
    ) : null;
}

export default UploadModal;
