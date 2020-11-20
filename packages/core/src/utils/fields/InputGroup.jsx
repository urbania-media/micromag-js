import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isString from 'lodash/isString';

import * as PanneauPropTypes from '../../../lib/panneau/PropTypes';
import { isMessage } from '../../../lib/utils';
import Label from '../../partials/Label';

const propTypes = {
    prepend: PropTypes.node,
    children: PropTypes.node,
    append: PropTypes.node,
    size: PanneauPropTypes.controlSize,
    className: PropTypes.string,
};

const defaultProps = {
    prepend: null,
    children: null,
    append: null,
    size: null,
    className: null,
};

const InputGroup = ({ prepend, children, append, size, className }) => (
    <div
        className={classNames([
            'input-group',
            'm-0',
            {
                [`input-group-${size}`]: size !== null,
                [className]: className !== null,
            },
        ])}
    >
        {prepend !== null ? (
            <div className="input-group-prepend">
                {isString(prepend) || isMessage(prepend) ? (
                    <div className="input-group-text">
                        <Label>{prepend}</Label>
                    </div>
                ) : (
                    prepend
                )}
            </div>
        ) : null}
        {children}
        {append !== null ? (
            <div className="input-group-append">
                {isString(append) || isMessage(prepend) ? (
                    <div className="input-group-text">
                        <Label>{append}</Label>
                    </div>
                ) : (
                    append
                )}
            </div>
        ) : null}
    </div>
);

InputGroup.propTypes = propTypes;
InputGroup.defaultProps = defaultProps;

export default InputGroup;
