/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import * as MicromagPropTypes from '../PropTypes';
import { getDisplayName } from '../utils';
import MediasRepository from '../lib/MediasRepository';

const MediasContext = React.createContext(null);

export const useMediasRepository = () => useContext(MediasContext);

export const withFieldMediasProvider = (FieldComponent) => {
    const propTypes = {
        value: MicromagPropTypes.media,
        onChange: PropTypes.func,
    };

    const defaultProps = {
        value: null,
        onChange: null,
    };

    const FieldMediasProvider = ({ value, onChange, ...props }) => {
        const mediasRepository = useMediasRepository();
        const fieldValue = useMemo(
            () =>
                mediasRepository !== null && value !== null ? mediasRepository.find(value) : value,
            [mediasRepository, value],
        );
        const fieldOnChange = useCallback(
            (newValue) => {
                const valueId = value !== null ? value.id || null : null;
                const newValueId = newValue !== null ? newValue.id || null : null;
                const finalNewValue =
                    valueId !== newValueId
                        ? mediasRepository.add(newValue)
                        : mediasRepository.path(newValue);
                if (valueId !== newValueId) {
                    mediasRepository.remove(value);
                }
                if (onChange !== null) {
                    onChange(finalNewValue);
                }
            },
            [mediasRepository, value, onChange],
        );
        return (
            <FieldComponent
                value={fieldValue}
                onChange={mediasRepository !== null ? fieldOnChange : onChange}
                {...props}
            />
        );
    };

    FieldMediasProvider.propTypes = propTypes;
    FieldMediasProvider.defaultProps = defaultProps;
    FieldMediasProvider.displayName = `WithFieldMediasProvider(${getDisplayName(FieldComponent)})`;

    return hoistNonReactStatics(FieldMediasProvider, FieldComponent);
};

const propTypes = {
    children: PropTypes.node.isRequired,
    medias: PropTypes.objectOf(MicromagPropTypes.media),
    onChange: PropTypes.func,
};

const defaultProps = {
    medias: null,
    onChange: null,
};

export const MediasProvider = ({ children, medias, onChange }) => {
    const repository = useMemo(() => new MediasRepository(medias), [medias]);
    useEffect(() => {
        if (onChange !== null) {
            repository.on('change', onChange);
        }
        return () => {
            if (onChange !== null) {
                repository.off('change', onChange);
            }
        };
    }, [repository, onChange]);
    return <MediasContext.Provider value={repository}>{children}</MediasContext.Provider>;
};

MediasProvider.propTypes = propTypes;
MediasProvider.defaultProps = defaultProps;

export default MediasContext;
