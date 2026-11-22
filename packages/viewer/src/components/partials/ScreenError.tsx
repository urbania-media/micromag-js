import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from '../../styles/partials/screen-error.module.css';

interface ScreenErrorProps {
    error?: Error | null;
    /** Show the error message (to the author in the editor) */
    withDetails?: boolean;
    className?: string | null;
}

/**
 * Neutral screen shown in place of a screen that failed to render
 */
function ScreenError({ error = null, withDetails = false, className = null }: ScreenErrorProps) {
    return (
        <div className={classNames([styles.container, className])}>
            <p className={styles.message}>
                <FormattedMessage
                    defaultMessage="This screen could not be displayed."
                    description="Message shown in place of a screen that failed to render"
                />
            </p>
            {withDetails && error !== null ? (
                <pre className={styles.details}>{error.message}</pre>
            ) : null}
        </div>
    );
}

export default ScreenError;
