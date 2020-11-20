/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import * as AppPropTypes from '../../../lib/PropTypes';
import { useFormValue } from '../../../contexts/FormContext';
import ToggleField from './Toggle';
import Label from '../../partials/Label';

const messages = defineMessages({
    selectShow: {
        id: 'forms.select_show_to_view_artists',
        defaultMessage: 'Select a show to view artists...',
    },
});

const propTypes = {
    value: AppPropTypes.artists,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const ArtistsField = ({ value, onChange, className }) => {
    const formValue = useFormValue();
    const showValue = formValue !== null ? formValue.show || null : null;
    const onArtistToggleChange = useCallback(
        (artist, newToggleValue) => {
            const newValue = !newToggleValue
                ? (value || []).filter((it) => it.id !== artist.id)
                : [
                      ...(value || []),
                      {
                          id: artist.id,
                      },
                  ];
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return showValue !== null ? (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {showValue.artists.map((it) => {
                const artistValue = (value || []).find((artist) => artist.id === it.id) || null;
                const artistEnabled = artistValue !== null;
                return (
                    <div className="list-group-item p-2" key={`artist-${it.id}`}>
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <ToggleField
                                    value={artistEnabled}
                                    onChange={(newValue) => onArtistToggleChange(it, newValue)}
                                />
                            </div>
                            <div className="col">
                                <small>{it.name}</small>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <div className="card bg-light text-muted text-center">
            <div className="card-body">
                <Label>{messages.selectShow}</Label>
            </div>
        </div>
    );
};

ArtistsField.propTypes = propTypes;
ArtistsField.defaultProps = defaultProps;

export default ArtistsField;
