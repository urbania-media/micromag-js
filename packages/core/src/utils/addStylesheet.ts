interface StylesheetDocument {
    head: { appendChild: (node: unknown) => unknown };
    createElement: (tagName: 'link') => { rel: string; href: string; remove: () => void };
}

const users = new Map<string, { count: number; link: { remove: () => void } }>();

/**
 * Adds a stylesheet link to the head of the document, once per URL, and returns a function that
 * removes it when no one uses it anymore. A link added by a script does not block the parser or
 * the scripts that follow it, unlike a `<link rel="stylesheet">` in server-rendered HTML.
 */
const addStylesheet = (
    href: string,
    doc: StylesheetDocument | null = typeof document !== 'undefined'
        ? (document as unknown as StylesheetDocument)
        : null,
): (() => void) => {
    if (doc === null) {
        return () => {};
    }
    const existing = users.get(href) || null;
    if (existing !== null) {
        existing.count += 1;
    } else {
        const link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        doc.head.appendChild(link);
        users.set(href, { count: 1, link });
    }
    let released = false;
    return () => {
        const current = users.get(href) || null;
        if (released || current === null) {
            return;
        }
        released = true;
        current.count -= 1;
        if (current.count === 0) {
            current.link.remove();
            users.delete(href);
        }
    };
};

export default addStylesheet;
