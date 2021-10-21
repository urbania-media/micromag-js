import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/placeholders/conversation.module.scss';

export const Conversation = () => (
    <div className={styles.container}>
        {[...Array(4)].map((e, idx) => (
            <div key={`message-${idx + 1}`} className={classNames([styles.message, styles[`placeholderMessage${idx}`]])} />
        ))}
        <FontAwesomeIcon icon={faCommentDots} className={styles.icon} />
    </div>
);

export default Conversation;
