import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import PlaceholderBlock from '../partials/PlaceholderBlock';
import PlaceholderText from '../partials/PlaceholderText';

interface QuizAnswerProps {
    width?: number | string;
    height?: number | string;
    className?: string | null;
    good?: boolean;
}

export function Answer({ className, good = true }: QuizAnswerProps) {
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                'mw-75',
                'opacity-75',
                className,
            ])}
        >
            <FontAwesomeIcon className="me-2 fs-2" icon={good ? faCheck : faTimes} />
            <PlaceholderBlock outline className="w-100 opacity-100">
                <PlaceholderText lines={1} height="1em" />
            </PlaceholderBlock>
        </div>
    );
}

export default Answer;
