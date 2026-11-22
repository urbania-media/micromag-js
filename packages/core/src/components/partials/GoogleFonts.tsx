import React, { useEffect } from 'react';

import { addStylesheet, getGoogleFontsUrl } from '../../utils';

interface GoogleFontsProps {
    fonts?: unknown[] | null;
    display?: string | null;
}

/**
 * Declares the Google fonts of a story with the Google Fonts stylesheet. Like the `@font-face`
 * rules of `FontFaces`, the browser only downloads the files of the fonts that text uses.
 *
 * The stylesheet is added to the head from an effect, as webfontloader did, and not rendered as a
 * `<link>`: in server-rendered HTML, a stylesheet link makes every script after it (hydration
 * included) wait for fonts.googleapis.com. The preconnects are hoisted to the head by React.
 */
function GoogleFonts({ fonts = null, display = 'swap' }: GoogleFontsProps) {
    const url = getGoogleFontsUrl(fonts, { display });

    useEffect(() => (url !== null ? addStylesheet(url) : undefined), [url]);

    if (url === null) {
        return null;
    }
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </>
    );
}

export default GoogleFonts;
