/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreensManager } from '@micromag/core/contexts';

const propTypes = {
    screen: MicromagPropTypes.screen.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

function ScreenStates({ screen, className }) {
    const screensManager = useScreensManager();
    const { type } = screen;
    const definition = screensManager.getDefinition(type) || null;
    const { states = [] } = definition || [];
    return (
        <div
            className={classNames([
                'container',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="row">
                {states.map(state => {
                    const { label = null, repeatable = false } = state;
                    return (
                        <div className="col">
                            <h5><FormattedMessage {...label} /></h5>
                            {repeatable ? (
                                <div />
                            ) : (
                                <div />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

ScreenStates.propTypes = propTypes;
ScreenStates.defaultProps = defaultProps;

export default ScreenStates;
