import React from 'react';

import { VisitorProvider } from '../../packages/core/src/contexts';

const withVisitor = (Story) => {
    return (
        <VisitorProvider visitor={{ id: 234 }}>
            <Story />
        </VisitorProvider>
    );
};

export default withVisitor;
