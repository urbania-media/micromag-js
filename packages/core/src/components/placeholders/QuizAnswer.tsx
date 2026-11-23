import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import classNames from 'classnames';

import InlineIcon from '../icons/Inline';
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
        <div className={classNames(['d-flex', 'align-items-center', 'mw-75', className])}>
            <InlineIcon className="me-2 fs-2" icon={good ? faCheck : faTimes} />
            <PlaceholderBlock outline className="w-100">
                <PlaceholderText lines={1} height="1em" />
            </PlaceholderBlock>
        </div>
    );
}

export default Answer;
