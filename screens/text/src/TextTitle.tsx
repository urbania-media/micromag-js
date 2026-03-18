import React from 'react';

import TextScreen from './Text';

function TextTitleScreen({ ...props }) {
    return <TextScreen {...props} withTitle />;
}

export default TextTitleScreen;
