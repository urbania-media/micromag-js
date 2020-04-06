/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Url from './Url';

const propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string,
    }),
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    onChange: null,
};

const VideoField = ({ value, onChange }) => (
    <Url
        value={value !== null ? value.url : null}
        onChange={newValue => {
            if (onChange !== null) {
                onChange(
                    newValue !== null
                        ? {
                              ...value,
                              url: newValue,
                          }
                        : null,
                );
            }
        }}
    />
);

VideoField.propTypes = propTypes;
VideoField.defaultProps = defaultProps;

export default VideoField;
