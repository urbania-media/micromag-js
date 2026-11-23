type Sanitize = (value: string) => string;

let sanitizer: Sanitize | null = null;
let loading: Promise<Sanitize> | null = null;

// Until DOMPurify is loaded: removes the characters that open or close markup
const stripMarkup: Sanitize = (value) => value.replace(/[<>]/g, '');

/**
 * Loads DOMPurify (in a chunk of its own) and resolves with the sanitizer. Resolves with a
 * stricter sanitizer that strips `<` and `>` if DOMPurify can't be loaded.
 */
export function loadUserInputSanitizer(): Promise<Sanitize> {
    if (loading === null) {
        loading = import('dompurify')
            .then(({ default: DOMPurify }) => {
                // Without a DOM (ex.: on a server), DOMPurify can't sanitize: keep stripping markup
                sanitizer =
                    DOMPurify.isSupported && typeof DOMPurify.sanitize === 'function'
                        ? (value) => DOMPurify.sanitize(value)
                        : stripMarkup;
                return sanitizer;
            })
            .catch(() => {
                loading = null;
                return stripMarkup;
            });
    }
    return loading;
}

/**
 * Sanitizes a value typed by a reader: with DOMPurify once it is loaded (see
 * `loadUserInputSanitizer`), and before that by stripping `<` and `>`, which leaves no markup at all
 */
function sanitizeUserInput(value: string): string {
    return sanitizer !== null ? sanitizer(value) : stripMarkup(value);
}

export default sanitizeUserInput;
