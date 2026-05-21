import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import PlaceholderBlock from '../partials/PlaceholderBlock';

interface ConversationProps {
    className?: string | null;
}

export function Conversation({ className }: ConversationProps) {
    return (
        <PlaceholderBlock className={classNames(['d-flex', 'flex-column', className])}>
            {[0.6, 0.5, 0.7, 0.8].map((width, idx) => (
                <div
                    key={`message-${idx + 1}`}
                    className="mb-1 rounded ms-auto"
                    style={{
                        backgroundColor: 'currentcolor',
                        height: '1em',
                        width: `${width * 100}%`,
                    }}
                />
            ))}
            <FontAwesomeIcon icon={faCommentDots} className="d-block ms-auto mt-2 fs-1" />
        </PlaceholderBlock>
    );
}

export default Conversation;
