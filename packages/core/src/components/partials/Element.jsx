/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { pascalCase } from '../../utils';
import PlaceholderBlock from './PlaceholderBlock';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    name: PropTypes.string.isRequired,
    components: PropTypes.object.isRequired, // eslint-disable-line
    props: PropTypes.object, // eslint-disable-line
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
    placeholderProps: PropTypes.object,// eslint-disable-line
};

const ElementComponent = ({
    name,
    components,
    props = {},
    isPlaceholder = false,
    className = null,
    placeholderProps = null,
}) => {
    if (!name) {
        return 'Bad component name';
    }

    if (isPlaceholder) {
        // TODO: figure out what this did
        // const PlaceholderComponent = Placeholders[pascalCase(name)];
        return <PlaceholderBlock {...placeholderProps} />;
    }

    const RealComponent = components[pascalCase(name)];

    if (!RealComponent) {
        return 'Bad component';
    }

    return <RealComponent {...props} className={className} />;
};

ElementComponent.propTypes = propTypes;

export default ElementComponent;
