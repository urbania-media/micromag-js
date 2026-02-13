import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';

import styles from  './screen.module.css';

function Screen() {
    return <NodeViewWrapper className={styles.container}>Screen</NodeViewWrapper>;
}

export default Screen;
