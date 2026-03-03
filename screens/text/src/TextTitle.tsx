/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TextScreen from './Text';

function TextTitleScreen({ ...props }) {
    return <TextScreen {...props} withTitle />;
}

export default TextTitleScreen;
