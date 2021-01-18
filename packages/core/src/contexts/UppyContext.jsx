/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { useIntl } from 'react-intl';

import useUppyLocale from '../hooks/useUppyLocale';
import getTransloaditMediasFromResponse from '../utils/getTransloaditMediasFromResponse';

const UppyContext = React.createContext(null);

export const useUppy = () => {
    const { uppy = null } = useContext(UppyContext) || null;
    return uppy;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    transport: PropTypes.oneOf(['xhr', 'transloadit', 'tus']),
    locale: PropTypes.string,
    sources: PropTypes.arrayOf(
        PropTypes.oneOf(['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive']),
    ),
    meta: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    maxNumberOfFiles: PropTypes.number,
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
    autoProceed: PropTypes.bool,
    transloadit: PropTypes.shape({
        key: PropTypes.string.isRequired,
        templateId: PropTypes.string,
        waitForEncoding: PropTypes.bool,
    }),
    companion: PropTypes.shape({
        url: PropTypes.string.isRequired,
        allowedHosts: PropTypes.string.isRequired,
    }),
    tus: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            endpoint: PropTypes.string.isRequired,
        }),
    ]),
    xhr: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            endpoint: PropTypes.string.isRequired,
        }),
    ]),
    onComplete: PropTypes.func,
};

const defaultProps = {
    transport: 'xhr',
    locale: null,
    sources: ['webcam', 'facebook', 'instagram', 'dropbox', 'google-drive'],
    meta: null,
    maxNumberOfFiles: 5,
    allowedFileTypes: ['image/*', 'video/*', 'audio/*'],
    autoProceed: false,
    transloadit: null,
    companion: null,
    tus: null,
    xhr: null,
    onComplete: null,
};

let packagesCache = null;
export const UppyProvider = ({
    children,
    transport,
    locale,
    sources,
    meta,
    maxNumberOfFiles,
    allowedFileTypes,
    autoProceed,
    transloadit,
    companion,
    tus,
    xhr,
    onComplete,
}) => {
    const previousUppyContext = useContext(UppyContext) || null;
    const uppyAlreadyExists = previousUppyContext !== null;
    const { uppy: previousUppy = null } = previousUppyContext || {};

    const [packages, setUppyPackages] = useState(packagesCache);

    const { locale: intlLocale } = useIntl();
    const finaleLocale = locale || intlLocale;
    const uppyLocale = useUppyLocale(finaleLocale);

    // Load uppy
    useEffect(() => {
        let canceled = false;
        if (packages !== null || uppyAlreadyExists) {
            return () => {
                canceled = true;
            }
        }
        import('../lib/uppy').then(({ default: newPackages }) => {
            if (!canceled) {
                packagesCache = newPackages;
                setUppyPackages(newPackages);
            }
        });
        return () => {
            canceled = true;
        }
    }, [uppyAlreadyExists, packages, setUppyPackages]);

    const uppy = useMemo(() => {
        const {
            Uppy = null,
            Transloadit,
            Tus,
            XHRUpload,
            Webcam,
            Dropbox,
            Facebook,
            Instagram,
            GoogleDrive,
        } = packages || {};
        if (uppyAlreadyExists || Uppy === null || uppyLocale === null) {
            return null;
        }

        let newUppy = new Uppy({
            meta,
            restrictions: { maxNumberOfFiles, allowedFileTypes },
            autoProceed,
            locale: uppyLocale,
        });

        if (transport === 'transloadit') {
            const { key, templateId, waitForEncoding = true, ...opts } = transloadit;
            newUppy.use(Transloadit, {
                params: {
                    auth: { key },
                    template_id: templateId,
                    ...opts,
                },
                waitForEncoding,
            });
        } else if (transport === 'tus') {
            newUppy.use(Tus, {
                endpoint: '/tus',
                resume: true,
                retryDelays: [0, 1000, 3000, 5000],
                ...tus,
            });
        } else if (transport === 'xhr') {
            newUppy.use(XHRUpload, {
                endpoint: isString(xhr) ? xhr : '/upload',
                ...(isObject(xhr) ? xhr : null),
            });
        }

        if (sources.indexOf('webcam') !== -1) {
            newUppy.use(Webcam, {
                id: 'webcam',
            });
        }

        if (transport === 'transloadit' || companion !== null) {
            const uppySources = {
                facebook: Facebook,
                dropbox: Dropbox,
                instagram: Instagram,
                'google-drive': GoogleDrive,
            };
            newUppy = sources.reduce((currentUppy, sourceId) => {
                const source = uppySources[sourceId] || null;
                if (source === null) {
                    return currentUppy;
                }
                const { url: companionUrl, allowedHosts: companionAllowedHosts } = companion || {
                    url: Transloadit.COMPANION || null,
                    allowedHosts: Transloadit.COMPANION_PATTERN || null,
                };
                return newUppy.use(source, {
                    id: sourceId,
                    companionUrl,
                    companionAllowedHosts,
                });
            }, newUppy);
        }

        return newUppy;
    }, [
        uppyAlreadyExists,
        packages,
        uppyLocale,
        meta,
        maxNumberOfFiles,
        allowedFileTypes,
        autoProceed,
        transport,
        transloadit,
        tus,
        companion,
        sources,
    ]);

    useEffect(() => {
        const finalUppy = previousUppy || uppy;
        const onUppyComplete = (response) => {
            const finalResponse =
                transport === 'transloadit' ? getTransloaditMediasFromResponse(response) : response;
            if (onComplete !== null) {
                onComplete(finalResponse);
            }
        };
        if (finalUppy !== null) {
            finalUppy.on('complete', onUppyComplete);
        }
        return () => {
            if (finalUppy !== null) {
                finalUppy.off('complete', onUppyComplete);
            }
        };
    }, [previousUppy, uppy, transport, onComplete]);

    useEffect(
        () => () => {
            if (uppy !== null) {
                uppy.close();
            }
        },
        [uppy],
    );

    const finalUppyContext = useMemo(() => (previousUppyContext || { uppy }), [previousUppyContext, uppy]);

    return <UppyContext.Provider value={finalUppyContext}>{children}</UppyContext.Provider>;
};

UppyProvider.propTypes = propTypes;
UppyProvider.defaultProps = defaultProps;

export default UppyContext;
