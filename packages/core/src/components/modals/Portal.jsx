/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import ElementPortal from '../utils/ElementPortal';
import { useModals } from '../../contexts';

const propTypes = {
    id: PropTypes.string,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
};

const ModalPortal = ({ id = null, data = null, children = null }) => {
    const { container, register = null, unregister = null } = useModals();
    return (
        <ElementPortal
            id={id}
            data={data}
            container={container}
            register={register}
            unregister={unregister}
        >
            {children}
        </ElementPortal>
    );
};

ModalPortal.propTypes = propTypes;

export default ModalPortal;
