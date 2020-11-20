/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';

// import * as AppPropTypes from '../../../lib/PropTypes';
import FormGroup from './FormGroup';
import ItemsField from './Items';
import UrlField from './Url';
import LocalizedField from './Localized';
import TextField from './Text';

const messages = defineMessages({
    label: {
        id: 'forms.label_label',
        defaultMessage: 'Label',
    },
    streamUrl: {
        id: 'forms.stream_url_label',
        defaultMessage: 'Stream URL',
    },
    addCamera: {
        id: 'forms.add_camera_button',
        defaultMessage: 'Add a camera',
    },
});

const propTypes = {};

const defaultProps = {};

const CamerasField = (props) => (
    <ItemsField
        renderItem={(item, index, { onChange }) => (
            <>
                <LocalizedField
                    label={messages.label}
                    locales={['fr', 'en', 'es']}
                    fieldComponent={TextField}
                    value={item.label || null}
                    onChange={(newValue) =>
                        onChange({
                            ...item,
                            label: newValue,
                        })
                    }
                />
                <FormGroup label={messages.streamUrl} className="mb-0">
                    <UrlField
                        value={item.stream || null}
                        onChange={(newValue) =>
                            onChange({
                                ...item,
                                stream: newValue,
                            })
                        }
                    />
                </FormGroup>
            </>
        )}
        addItemLabel={messages.addCamera}
        {...props}
    />
);

CamerasField.propTypes = propTypes;
CamerasField.defaultProps = defaultProps;

export default CamerasField;
