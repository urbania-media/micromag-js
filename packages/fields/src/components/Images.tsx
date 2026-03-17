/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// // import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import type { ImageMedia } from '@micromag/core';

import ImageField from './Image';
import ItemsField from './Items';

interface ImagesFieldProps {
    value?: ImageMedia[] | null;
}

function ImagesField({ value: value = null, ...props }: ImagesFieldProps) {
    return (
        <ItemsField
            noItemLabel={
                <FormattedMessage
                    defaultMessage="No image..."
                    description="Label when there is no item in images field"
                />
            }
            addItemLabel={
                <FormattedMessage
                    defaultMessage="Add an image"
                    description="Button label in images field"
                />
            }
            itemComponent={ImageField}
            {...props}
            value={value}
        />
    );
}

export default ImagesField;
