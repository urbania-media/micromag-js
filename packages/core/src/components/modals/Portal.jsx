/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { useModals } from '../../contexts/ModalsContext';

const propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    id: null,
    children: null,
};

const ModalPortal = ({ id, children }) => {
    const { containerRef = null, register = null, unregister = null } = useModals();
    const modalId = useMemo(() => id || `modal-${new Date().getTime()}`, [id]);
    useEffect(() => {
        register(modalId);
        return () => {
            unregister(modalId);
        };
    }, [modalId]);
    return containerRef.current !== null
        ? ReactDOM.createPortal(children, containerRef.current)
        : null;
};

ModalPortal.propTypes = propTypes;
ModalPortal.defaultProps = defaultProps;

export default ModalPortal;
