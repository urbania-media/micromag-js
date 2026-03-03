/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';

// import classNames from 'classnames';
import { getDisplayName } from '../../utils';

import Portal from './Portal';

import styles from '../../styles/panels/panel.module.css';

interface PanelProps {
    id?: string | null;
    title?: string | null;
    children?: React.ReactNode | null;
}

function Panel({ id = null, children = null, title = null }: PanelProps) {
    const finalId = useMemo(() => id || getDisplayName(children.type), [id, children.type]);
    const data = useMemo(
        () => ({
            title,
        }),
        [title],
    );
    return (
        <Portal id={finalId} data={data}>
            <div className={styles.container}>{children}</div>
        </Portal>
    );
}

export default Panel;
