import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { DashboardModal } from '@uppy/react';

import useUppy from '../../hooks/useUppy';
import convertUppyToMedia from '../../utils/convertUppyToMedia';

import '../../styles/partials/upload-modal.scss';

const propTypes = {
    opened: PropTypes.bool,
    onUploaded: PropTypes.func,
    onRequestClose: PropTypes.func,
};

const defaultProps = {
    opened: false,
    onUploaded: null,
    onRequestClose: null,
};

const UploadModal = ({ opened, onUploaded, onRequestClose }) => {
    const onUpppyComplete = useCallback(
        result => {
            const newValue = result.successful
                .map(it =>
                    convertUppyToMedia({
                        ...it,
                        transloadit:
                            result.transloadit.find(
                                subIt => subIt.assembly_id === it.transloadit.assembly,
                            ) || null,
                    }),
                )
                .filter(it => it.transloadit !== null);
            if (onUploaded !== null) {
                onUploaded(newValue);
            }
        },
        [onUploaded],
    );

    const uppy = useUppy({
        onComplete: onUpppyComplete,
    });

    return (
        <DashboardModal
            uppy={uppy}
            open={opened}
            closeAfterFinish
            onRequestClose={onRequestClose}
            plugins={['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive']}
        />
    );
};

UploadModal.propTypes = propTypes;
UploadModal.defaultProps = defaultProps;

export default UploadModal;
