/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// // import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { ImageMedia } from '@micromag/core';

import FontField from './Font';
import ItemsField from './Items';

interface FontsFieldProps {
    value?: ImageMedia[] | null;
}

function FontsField({ value: value = null, ...props }: FontsFieldProps) {
    return (
        <ItemsField
            noItemLabel={
                <FormattedMessage
                    defaultMessage="No font..."
                    description="Label when there is no item"
                />
            }
            addItemLabel={
                <FormattedMessage defaultMessage="Add an font file" description="Button label" />
            }
            itemComponent={FontField}
            {...props}
            value={value}
        />
    );
}

export default FontsField;
