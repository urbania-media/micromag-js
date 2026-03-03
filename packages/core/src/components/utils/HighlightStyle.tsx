import React from 'react';

import { convertStyleToString } from '../../utils';

interface HighlightStyleProps {
    selector?: string | null;
    highlightSelector?: string;
    style?: Record<string, string | number> | null;
}

function HighlightStyle({
    selector = null,
    highlightSelector = 'mark',
    style = null,
}: HighlightStyleProps) {
    return style !== null ? (
        <style
            type="text/css"
            dangerouslySetInnerHTML={{
                __html: `${[selector, highlightSelector]
                    .filter((it) => it !== null)
                    .join(' ')}{${convertStyleToString(style)}}`,
            }}
        />
    ) : null;
}

export default HighlightStyle;
