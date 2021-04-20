import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
// import classNames from 'classnames';
import { DashboardModal } from '@uppy/react';

import { PropTypes as MicromagPropTypes } from '../../lib';

import { useUppy } from '../../contexts';

import '../../styles/modals/upload.scss';

const propTypes = {
    type: PropTypes.oneOfType([MicromagPropTypes.mediaTypes, PropTypes.array]),
    opened: PropTypes.bool,
    sources: PropTypes.arrayOf(PropTypes.string),
    onUploaded: PropTypes.func,
    onRequestClose: PropTypes.func,
};

const defaultProps = {
    type: null,
    opened: false,
    sources: ['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive'],
    onUploaded: null,
    onRequestClose: null,
};

const UploadModal = ({ type, opened, sources, onUploaded, onRequestClose }) => {
    const onUpppyComplete = useCallback(
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
        onComplete: onUpppyComplete,
        sources,
        allowedFileTypes: fileTypes !== null && fileTypes.length > 0 ? fileTypes : null,
    });

    useEffect(() => {
        if (uppy !== null && !opened) {
            uppy.reset();
        }
    }, [uppy, opened]);

    return uppy !== null ? (
        <DashboardModal
            uppy={uppy}
            open={opened}
            closeAfterFinish
            onRequestClose={onRequestClose}
            plugins={sources}
        />
    ) : null;
};

UploadModal.propTypes = propTypes;
UploadModal.defaultProps = defaultProps;

export default UploadModal;
