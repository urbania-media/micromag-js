/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { pascalCase } from 'change-case';

import { Placeholders } from '@micromag/core';

import Text from '@micromag/component-text';
import Heading from '@micromag/component-heading';
import Video from '@micromag/component-video';
import Image from '@micromag/component-image';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';

const components = {
    Text,
    Heading,
    Image,
    Video,
};

const propTypes = {
    name: PropTypes.string.isRequired,
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

const FieldComponent = ({ name, props, isPlaceholder, className, placeholderClassName }) => {
    // console.log(name, props, isPlaceholder, className, placeholderClassName);
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

FieldComponent.propTypes = propTypes;
FieldComponent.defaultProps = defaultProps;

export default FieldComponent;
