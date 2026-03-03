/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// // import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import type { ImageMedia } from '@micromag/core';
import ItemsField from './Items';
import FontField from './Font';

interface FontsFieldProps {
    value?: ImageMedia[];
}

function FontsField(
    {
        value: value = null,
        ...props
    },
) {
    return (
        <ItemsField
            noItemLabel={
                <FormattedMessage
                    defaultMessage="No font..."
                    description="Label when there is no item"
                />
            }
            addItemLabel={
                <FormattedMessage
                    defaultMessage="Add an font file"
                    description="Button label"
                />
            }
            itemComponent={FontField}
            {...props}
        />
    );
}

export default FontsField;
