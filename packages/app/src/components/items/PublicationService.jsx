/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import { FormattedMessage } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label, Button } from '@micromag/core/components';
import { Toggle, Fields } from '@micromag/fields';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    item: AppPropTypes.publicationService.isRequired,
    value: AppPropTypes.publicationServiceValue,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const PublicationSevice = ({ item, value, className, onChange }) => {
    const { id, settings: settingsFields = null } = item;
    const [settingsOpened, setSettingsOpened] = useState(false);
    const enabled = isObject(value) ? value.enabled || false : value || false;
    const settings = isObject(value) ? value.settings || null : null;
    const onEnableChange = useCallback(
        (checked) => {
            const newValue = isObject(value)
                ? {
                      ...value,
                      enabled: checked,
                  }
                : checked;
            if (!checked && settingsOpened) {
                setSettingsOpened(false);
            }
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [id, value, settingsOpened, setSettingsOpened, onChange],
    );
    const onClickSettings = useCallback(() => setSettingsOpened(!settingsOpened), [
        settingsOpened,
        setSettingsOpened,
    ]);
    const onSettingsChange = useCallback(
        (newSettings) => {
            const currentEnabled = isObject(value) ? value.enabled || false : value || false;
            const newValue =
                newSettings !== null
                    ? {
                          enabled: currentEnabled,
                          settings: newSettings,
                      }
                    : currentEnabled;
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return (
        <li
            className={classNames([
                'list-group-item',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="row align-items-center mx-n2">
                <div className="col px-2">
                    <Label>{item.label}</Label>
                </div>
                {settingsFields !== null ? (
                    <div className="col-auto px-2">
                        <Button
                            theme="secondary"
                            size="sm"
                            outline
                            onClick={onClickSettings}
                            disabled={!enabled}
                            className={classNames({
                                active: settingsOpened,
                            })}
                        >
                            <FormattedMessage
                                defaultMessage="Settings"
                                description="Button label"
                            />
                        </Button>
                    </div>
                ) : null}
                <div className="col-auto px-2">
                    <Toggle value={enabled} onChange={onEnableChange} />
                </div>
            </div>
            {settingsFields !== null ? (
                <div
                    className={classNames([
                        'pt-4',
                        {
                            'd-none': !settingsOpened,
                        },
                    ])}
                >
                    <Fields
                        fields={settingsFields.map((it) => ({
                            ...it,
                            isHorizontal: true,
                        }))}
                        value={settings}
                        isList
                        onChange={onSettingsChange}
                    />
                </div>
            ) : null}
        </li>
    );
};

PublicationSevice.propTypes = propTypes;
PublicationSevice.defaultProps = defaultProps;

export default PublicationSevice;
