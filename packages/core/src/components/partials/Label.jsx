/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { isMessage } from '../../utils';

const propTypes = {
    children: MicromagPropTypes.label.isRequired,
    isHtml: PropTypes.bool,
    values: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    isHtml: false,
    values: {},
};

const Label = ({ children, isHtml, values }) => {
    const Message = isHtml ? FormattedMessage : FormattedMessage;
    return isMessage(children) ? <Message values={values} {...children} /> : children;
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
