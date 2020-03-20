/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../../PropTypes';
import { getComponentFromName } from '../../utils';

// import * as ScreenComponents from './index';
// TODO: replace this with the real import
const ScreenComponents = {};

const propTypes = {
    screen: AppPropTypes.component.isRequired,
    component: PropTypes.node,
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    component: null,
    isPreview: false,
    isPlaceholder: false,
    className: null,
};

const Screen = ({ screen, component, isPreview, isPlaceholder, className }) => {
    const { type } = screen;
    const ScreenComponent = getComponentFromName(type, ScreenComponents) || null;

    return ScreenComponent !== null ? (
        <div className={className}>
            <ScreenComponent {...screen} isPreview={isPreview} isPlaceholder={isPlaceholder} />
        </div>
    ) : (
        <div className={className}>{component}</div>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default Screen;
