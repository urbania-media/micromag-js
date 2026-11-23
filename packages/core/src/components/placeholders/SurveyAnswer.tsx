import { faPercent } from '@fortawesome/free-solid-svg-icons/faPercent';
import classNames from 'classnames';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock from '../partials/PlaceholderBlock';
import PlaceholderText from '../partials/PlaceholderText';

interface SurveyAnswerProps {
    className?: string | null;
}

export function Answer({ className }: SurveyAnswerProps) {
    return (
        <div className={classNames(['d-flex', 'align-items-center', 'mw-75', className])}>
            <PlaceholderBlock outline className="w-100 me-2">
                <PlaceholderText lines={1} height="1em" />
            </PlaceholderBlock>
            <InlineIcon icon={faPercent} className="fs-2" />
        </div>
    );
}

export default Answer;
