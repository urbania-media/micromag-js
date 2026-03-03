/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// // import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import type { ImageMedia } from '@micromag/core';
import ItemsField from './Items';
import ImageField from './Image';

interface ImagesFieldProps {
    value?: ImageMedia[];
}

function ImagesField(
    {
        value: value = null,
        ...props
    },
) {
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
        />
    );
}

export default ImagesField;
