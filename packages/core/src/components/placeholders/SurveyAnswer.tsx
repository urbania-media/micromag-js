import { faPercent } from '@fortawesome/free-solid-svg-icons/faPercent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import PlaceholderBlock from '../partials/PlaceholderBlock';
import PlaceholderText from '../partials/PlaceholderText';

interface SurveyAnswerProps {
    className?: string | null;
}

export function Answer({ className }: SurveyAnswerProps) {
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
            <PlaceholderBlock outline className="w-100 me-2 opacity-100">
                <PlaceholderText lines={1} height="1em" />
            </PlaceholderBlock>
            <FontAwesomeIcon icon={faPercent} className="fs-2" />
        </div>
    );
}

export default Answer;
