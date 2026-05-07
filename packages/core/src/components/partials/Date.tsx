import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

interface DateProps {
    date?: string | null;
    withTime?: boolean;
    timeSeparator?: ReactNode;
}

function Date({ date = null, withTime = false, timeSeparator = ', ' }: DateProps) {
    const dateObject = dayjs(date).toDate();
    return (
        <>
            <FormattedDate value={dateObject} year="numeric" month="long" day="2-digit" />
            {withTime ? timeSeparator : null}
            {withTime ? <FormattedTime value={dateObject} /> : null}
        </>
    );
}

export default Date;
