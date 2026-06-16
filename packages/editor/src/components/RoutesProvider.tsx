import { ReactNode } from 'react';

import { RoutesProvider, useFormsComponents } from '@micromag/core/contexts';
import { slug } from '@micromag/core/utils';

interface EditorRoutesProviderProps {
    routes: Record<string, string>;
    children: ReactNode;
}

function EditorRoutesProvider({ routes, children }: EditorRoutesProviderProps) {
    const formComponents = useFormsComponents();
    const formRegEx =
        formComponents !== null
            ? Object.keys(formComponents)
                  .map((name) => slug(name))
                  .join('|')
            : null;
    return (
        <RoutesProvider
            routes={{
                ...routes,
                'screen.field.form': routes['screen.field.form'].replace(
                    /:form$/,
                    `:form(${formRegEx})`,
                ),
            }}
        >
            {children}
        </RoutesProvider>
    );
}

export default EditorRoutesProvider;
