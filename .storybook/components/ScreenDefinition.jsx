/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import isArray from 'lodash/isArray';
import { FormattedMessage } from 'react-intl';

import * as MicromagPropTypes from '../../packages/core/src/PropTypes';
import ScreenFields from './ScreenFields';

const propTypes = {
    definition: MicromagPropTypes.screenDefinition.isRequired,
};

const defaultProps = {};

const ScreenDefinition = ({ definition }) => (
    <div className="container">
        {(isArray(definition) ? definition : [definition]).map((def) => (
            <div key={`definition-${def.id}`}>
                <h3>
                    <FormattedMessage {...def.title} />
                </h3>
                <h4>Fields</h4>
                <div className="bg-light">
                    <ScreenFields definition={def} />
                </div>
                <hr />
                <h4>JSON</h4>
                <pre className="bg-light color-dark">
                    <code>{JSON.stringify(def, null, '    ')}</code>
                </pre>
            </div>
        ))}
    </div>
);

ScreenDefinition.propTypes = propTypes;
ScreenDefinition.defaultProps = defaultProps;

export default ScreenDefinition;
