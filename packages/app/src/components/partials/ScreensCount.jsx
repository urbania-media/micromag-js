import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const propTypes = {
    count: PropTypes.number.isRequired,
};

const defaultProps = {};

const ScreensCount = ({ count }) => (
    <FormattedMessage
        defaultMessage="{count} {count, plural, one {screen} other {screens}}"
        description="Screens count label"
        values={{ count }}
    />
);

ScreensCount.propTypes = propTypes;
ScreensCount.defaultProps = defaultProps;

export default ScreensCount;
