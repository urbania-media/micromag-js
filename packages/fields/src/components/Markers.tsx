/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// // import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import ItemsField from './Items';
import MarkerField from './Marker';

interface MarkersFieldProps {
    [key: string]: unknown;
}

function MarkersField(props) {
    return (
        <ItemsField
            noItemLabel={
                <FormattedMessage
                    defaultMessage="No marker..."
                    description="Label when there is no item in markers field"
                />
            }
            addItemLabel={
                <FormattedMessage
                    defaultMessage="Add a marker"
                    description="Button label in markers field"
                />
            }
            itemComponent={MarkerField}
            {...props}
        />
    );
}

export default MarkersField;
