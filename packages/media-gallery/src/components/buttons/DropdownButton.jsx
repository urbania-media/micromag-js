/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { Button, Label } from '@micromag/core';

const propTypes = {
    dropdownItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            onClick: PropTypes.func,
        }),
    ),
    className: PropTypes.string,
};

const defaultProps = {
    dropdownItems: [
        { id: 'rename', label: 'Renommer', onClick: null },
        { id: 'delete', label: 'Supprimer', onClick: null },
    ],
    className: null,
};

const DropdownButton = ({ dropdownItems, className }) => {
    const [opened, setOpened] = useState(false);

    const onOpen = useCallback(() => setOpened(!opened));

    return (
        <div
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={classNames([
                    'dropdown',
                    {
                        show: opened,
                    },
                ])}
            >
                <Button
                    id="dropdownMenu"
                    onClick={onOpen}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    theme="secondary"
                    icon={<FontAwesomeIcon icon={faCog} />}
                />
                <ul
                    className={classNames([
                        'dropdown-menu',
                        'dropdown-menu-right',
                        {
                            show: opened,
                        },
                    ])}
                >
                    {dropdownItems.map((it, index) => {
                        const { label: itemLabel, onClick: itemOnClick = null } = it;

                        const itemProps = {
                            className: 'dropdown-item',
                            key: `dropdown-${index}`,
                            onClick: e => {
                                if (itemOnClick !== null) {
                                    itemOnClick(e, it, index);
                                }
                            },
                        };
                        return (
                            <button {...itemProps}>
                                <Label>{itemLabel}</Label>
                            </button>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

DropdownButton.propTypes = propTypes;
DropdownButton.defaultProps = defaultProps;

export default DropdownButton;
