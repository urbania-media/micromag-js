/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label, Button } from '@micromag/core/components';
import { Toggle, Fields } from '@micromag/fields';

import * as AppPropTypes from '../../lib/PropTypes';

const messages = defineMessages({
    settings: {
        id: 'publish_service.settings',
        defaultMessage: 'Settings',
    },
});

const propTypes = {
    item: AppPropTypes.publishService.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: null,
    onChange: null,
};

const PublishSevice = ({ item, className, onChange }) => {
    const { enabled = false, settings = null } = item;
    const [settingsOpened, setSettingsOpened] = useState(false);
    const onEnableChange = useCallback(
        checked => {
            const newItem = {
                ...item,
                enabled: checked,
            };
            if (!checked && settingsOpened) {
                setSettingsOpened(false);
            }
            if (onChange !== null) {
                onChange(newItem);
            }
        },
        [item, settingsOpened, setSettingsOpened, onChange],
    );
    const onClickSettings = useCallback(() => setSettingsOpened(!settingsOpened), [
        settingsOpened,
        setSettingsOpened,
    ]);
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
                {settings !== null ? (
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
                            {messages.settings}
                        </Button>
                    </div>
                ) : null}
                <div className="col-auto px-2">
                    <Toggle value={enabled} onChange={onEnableChange} />
                </div>
            </div>
            {settings !== null ? (
                <div
                    className={classNames([
                        'pt-4',
                        {
                            'd-none': !settingsOpened,
                        },
                    ])}
                >
                    <Fields
                        fields={settings.map(it => ({
                            ...it,
                            isHorizontal: true,
                        }))}
                        isList
                    />
                </div>
            ) : null}
        </li>
    );
};

PublishSevice.propTypes = propTypes;
PublishSevice.defaultProps = defaultProps;

export default PublishSevice;
