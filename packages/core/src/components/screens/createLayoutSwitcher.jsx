/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import * as AppPropTypes from '../../PropTypes';
import { getComponentFromName } from '../../utils';

const createLayoutSwitcher = (components, defaultComponent = null) => {
    const propTypes = {
        layout: AppPropTypes.componentNames(components).isRequired,
    };

    const defaultProps = {};

    const LayoutSwitcher = ({ layout, ...props }) => {
        const LayoutComponent = getComponentFromName(
            layout,
            components,
            defaultComponent || components.Default || null,
        );
        return <LayoutComponent {...props} />;
    };

    LayoutSwitcher.propTypes = propTypes;
    LayoutSwitcher.defaultProps = defaultProps;

    return LayoutSwitcher;
};

export default createLayoutSwitcher;
