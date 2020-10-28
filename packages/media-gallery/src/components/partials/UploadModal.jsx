import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { DashboardModal } from '@uppy/react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import useUppy from '../../hooks/useUppy';
import convertUppyToMedia from '../../utils/convertUppyToMedia';

import '../../styles/partials/upload-modal.scss';

const propTypes = {
    meta: PropTypes.shape({
        user: MicromagPropTypes.user,
    }),
    opened: PropTypes.bool,
    onUploaded: PropTypes.func,
    onRequestClose: PropTypes.func,
};

const defaultProps = {
    meta: null,
    opened: false,
    onUploaded: null,
    onRequestClose: null,
};

const UploadModal = ({ meta, opened, onUploaded, onRequestClose }) => {
    const onUpppyComplete = useCallback(
        (response) => {
            const newValue = response.successful
                .map((it) => {
                    const transloadit =
                        response.transloadit.find(
                            (subIt) => subIt.assembly_id === it.transloadit.assembly,
                        ) || null;
                    const results = transloadit !== null ? transloadit.results || null : null;
                    return {
                        ...it,
                        transloadit:
                            results !== null
                                ? Object.keys(results).reduce((map, resultKey) => {
                                      const result = results[resultKey].find(
                                          (itResult) => itResult.name === it.name,
                                      );
                                      return result !== null
                                          ? {
                                                ...map,
                                                [resultKey]: result,
                                            }
                                          : map;
                                  }, null)
                                : null,
                    };
                })
                .filter((it) => it.transloadit !== null)
                .map((it) => convertUppyToMedia(it));
            if (onUploaded !== null) {
                onUploaded(newValue);
            }
        },
        [onUploaded],
    );

    const uppy = useUppy({
        onComplete: onUpppyComplete,
        meta,
    });

    useEffect(() => {
        if (!opened) {
            uppy.reset();
        }
    }, [uppy, opened]);

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
