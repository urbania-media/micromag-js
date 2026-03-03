import React from 'react';

import { convertStyleToString } from '../../utils';

interface LinkStyleProps {
    selector?: string | null;
    linkSelector?: string;
    style?: Record<string, string | number> | null;
}

function LinkStyle({ selector = null, linkSelector = 'a', style = null }: LinkStyleProps) {
    return style !== null ? (
        <style
            type="text/css"
            dangerouslySetInnerHTML={{
                __html: `${[selector, linkSelector].filter((it) => it !== null).join(' ')}{${convertStyleToString(
                    style,
                )}}`,
            }}
        />
    ) : null;
}

export default LinkStyle;
