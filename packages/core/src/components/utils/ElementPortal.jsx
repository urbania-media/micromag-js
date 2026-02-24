/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    register: PropTypes.func,
    unregister: PropTypes.func,
    children: PropTypes.node,
};

const ElementPortal = ({ id = null, data = null, children = null, container = null, register = null, unregister = null }) => {
    const finalId = useMemo(() => id || `element-${new Date().getTime()}`, [id]);
    useEffect(() => {
        if (register !== null) {
            register(finalId, data);
        }
        return () => {
            if (unregister !== null) {
                unregister(finalId);
            }
        };
    }, [finalId, data]);
    return container !== null ? createPortal(children, container) : null;
};

ElementPortal.propTypes = propTypes;

export default ElementPortal;
