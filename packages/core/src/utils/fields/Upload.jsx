import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Dashboard } from '@uppy/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileAudio } from '@fortawesome/free-solid-svg-icons';
import prettyBytes from 'pretty-bytes';

import useUppy from '../../../hooks/useUppy';
import { useUrlGenerator } from '../../../contexts/RoutesContext';
import Button from '../buttons/Button';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const propTypes = {
    value: PropTypes.shape({
        filename: PropTypes.string,
        size: PropTypes.number,
    }),
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    allowedFileTypes: ['audio/*'],
    onChange: null,
};

const UploadField = ({ value, allowedFileTypes, onChange }) => {
    const route = useUrlGenerator();
    const onUpppyComplete = useCallback(
        (response) => {
            const newValue =
                response.successful.length > 0 ? response.successful[0].response.body : null;
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const uppy = useUppy({
        allowedFileTypes,
        endpoint: route('upload'),
        onComplete: onUpppyComplete,
    });

    const onClickRemove = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
    }, [onChange]);

    return (
        <div>
            {value !== null ? (
                <div className="card">
                    <div className="card-body p-1 pl-2">
                        <div className="media align-items-center">
                            <FontAwesomeIcon icon={faFileAudio} className="mr-2" />
                            <div className="media-body text-truncate small mr-2">
                                <strong>{value.filename}</strong>
                            </div>
                            <small className="text-muted">{prettyBytes(value.size)}</small>
                            <div className="ml-1">
                                <Button
                                    type="button"
                                    size="sm"
                                    theme="secondary"
                                    outline
                                    onClick={onClickRemove}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Dashboard uppy={uppy} height={300} plugins={['dropbox', 'google-drive']} />
            )}
        </div>
    );
};

UploadField.propTypes = propTypes;
UploadField.defaultProps = defaultProps;

export default UploadField;
