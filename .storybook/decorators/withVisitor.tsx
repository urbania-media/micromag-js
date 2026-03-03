import React from 'react';

import { VisitorProvider } from '../../packages/core/src/contexts';

const defaultVisitor = { id: 234 };

const withVisitor = (Story) => {
    return (
        <VisitorProvider visitor={defaultVisitor}>
            <Story />
        </VisitorProvider>
    );
};

export default withVisitor;
