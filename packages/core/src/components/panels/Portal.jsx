/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import ElementPortal from '../utils/ElementPortal';
import { usePanels } from '../../contexts';

const propTypes = {
    id: PropTypes.string,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
};

const PanelPortal = ({ id = null, data = null, children = null }) => {
    const { panels = null, container, register = null, unregister = null } = usePanels();
    if (panels === null) {
        return children;
    }
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

PanelPortal.propTypes = propTypes;

export default PanelPortal;
