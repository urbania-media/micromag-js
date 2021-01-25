/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TextScreen from './Text';

const TextTitleScreen = ({ ...props }) => <TextScreen {...props} withTitle />;

export default TextTitleScreen;
