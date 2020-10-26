/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import * as MicromagPropTypes from '../../packages/core/src/PropTypes';
import ScreenFields from './ScreenFields';

const propTypes = {
    definition: MicromagPropTypes.screenDefinition.isRequired,
};

const defaultProps = {};

const ScreenDefinition = ({ definition }) => (
    <div className="container">
        <h4>Fields</h4>
        <div className="bg-light">
            <ScreenFields definition={definition} />
        </div>
        <hr />
        <h4>JSON</h4>
        <pre className="bg-light color-dark">
            <code>{JSON.stringify(definition, null, '    ')}</code>
        </pre>
    </div>
);

ScreenDefinition.propTypes = propTypes;
ScreenDefinition.defaultProps = defaultProps;

export default ScreenDefinition;
