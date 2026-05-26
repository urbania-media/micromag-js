import { TextElement } from '@micromag/core';

import Fields from './Fields';

interface MarkerFieldProps {
    value?: { title?: TextElement } | null;
    isForm?: boolean;
    className?: string | null;
}

function MarkerField({
    isForm = false,
    value = null,
    className = null,
    ...props
}: MarkerFieldProps) {
    const { title = null } = value || {};
    return isForm ? (
        <div className={className}>
            <Fields {...props} value={value} />
        </div>
    ) : (
        <div className={className}>
            {title !== null ? title.body : <span className="text-muted">Entrez les infos...</span>}
        </div>
    );
}

export default MarkerField;
