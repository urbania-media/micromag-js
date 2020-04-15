/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { pascalCase } from '../../utils';
import Placeholders from './Placeholders';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    name: PropTypes.string.isRequired,
    components: PropTypes.object.isRequired, // eslint-disable-line
    props: PropTypes.object, // eslint-disable-line
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
    placeholderClassName: PropTypes.string,
};

const defaultProps = {
    props: {},
    isPlaceholder: false,
    className: null,
    placeholderClassName: null,
};

const ElementComponent = ({
    name,
    components,
    props,
    isPlaceholder,
    className,
    placeholderClassName,
}) => {
    if (!name) {
        return 'Bad component name';
    }

    if (isPlaceholder) {
        const PlaceholderComponent = Placeholders[pascalCase(name)];
        return <PlaceholderComponent className={placeholderClassName} />;
    }

    const RealComponent = components[pascalCase(name)];

    if (!RealComponent) {
        return 'Bad component';
    }

    return <RealComponent {...props} className={className} />;
};

ElementComponent.propTypes = propTypes;
ElementComponent.defaultProps = defaultProps;

export default ElementComponent;
