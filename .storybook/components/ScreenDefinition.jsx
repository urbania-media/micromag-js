/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import isArray from 'lodash/isArray';
import { FormattedMessage } from 'react-intl';

import * as MicromagPropTypes from '../../packages/core/src/PropTypes';
import { ScreensProvider } from '../../packages/core/src/contexts/ScreensContext';
import { ScreenProvider } from '../../packages/core/src/contexts/ScreenContext';
import ScreenFields from './ScreenFields';
import Screen from './Screen';

const propTypes = {
    definition: MicromagPropTypes.screenDefinition.isRequired,
    defaultScreen: MicromagPropTypes.screen,
};

const defaultProps = {
    defaultScreen: null,
};

const ScreenDefinition = ({ definition, defaultScreen }) => {
    const definitions = isArray(definition) ? definition : [definition];
    const [data, setData] = useState({
        type: definition.id,
        ...defaultScreen,
    });
    return (
        <ScreensProvider screens={definitions}>
            <div className="container">
                {definitions.map((def, index) => {
                    const { title, group = null, component: ScreenComponent } = def;
                    return (
                        <ScreenProvider data={data} definition={def} key={`definition-${def.id}`}>
                            {index > 0 ? <hr className="border-light my-4" /> : null}
                            <h1 className="mb-4">
                                {group !== null ? (
                                    <small className="text-muted">
                                        <FormattedMessage {...group} /> /{' '}
                                    </small>
                                ) : null}
                                <FormattedMessage {...title} />
                            </h1>
                            <div className="row">
                                <div className="col mb-4 mb-md-0">
                                    <h4 className="mb-2">Fields</h4>
                                    <ScreenFields
                                        definition={def}
                                        value={data}
                                        onChange={setData}
                                    />
                                </div>
                                <div className="col">
                                    <h4>Preview</h4>
                                    <Screen
                                        definition={def}
                                        screen={data}
                                        width={320}
                                        height={500}
                                        withBorder
                                    >
                                        <ScreenComponent {...data} active current />
                                    </Screen>
                                </div>
                            </div>
                        </ScreenProvider>
                    );
                })}
            </div>
        </ScreensProvider>
    );
};

ScreenDefinition.propTypes = propTypes;
ScreenDefinition.defaultProps = defaultProps;

export default ScreenDefinition;
