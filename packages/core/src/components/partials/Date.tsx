/* eslint-disable react/jsx-props-no-spreading */
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

interface DateProps {
    date?: string;
    withTime?: boolean;
    timeSeparator?: React.ReactNode;
}

function Date({ date = null, withTime = false, timeSeparator = ', ' }: DateProps) {
    const dateObject = useMemo(() => dayjs(date).toDate(), [date]);
    return (
        <>
            <FormattedDate value={dateObject} year="numeric" month="long" day="2-digit" />
            {withTime ? timeSeparator : null}
            {withTime ? <FormattedTime value={dateObject} /> : null}
        </>
    );
}

export default Date;
