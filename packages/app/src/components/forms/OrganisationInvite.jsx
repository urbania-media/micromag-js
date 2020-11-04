/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Text as TextField, Select } from '@micromag/fields';
import { Button } from '@micromag/core/components';
import { useOrganisationMemberBatch, useOrganisationRoles } from '@micromag/data';

import AddButton from '../buttons/Add';
// import { validateEmail } from '../../lib/utils';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    className: PropTypes.string,
    onContinue: PropTypes.func,
};

const defaultProps = {
    className: null,
    onContinue: null,
};

const OrganisationInviteForm = ({ organisation, className, onContinue }) => {
    const [creatingItems, setCreatingItems] = useState(
        [...Array(5)].map(() => ({ email: '', role: 'user' })),
    );
    const { roles } = useOrganisationRoles();
    const { batch: batchMembers } = useOrganisationMemberBatch(organisation.id);
    const postForm = useCallback((data) => batchMembers(data), [batchMembers]);

    const onSubmit = useCallback(() => {
        const items = creatingItems.filter((it) => it && it.email && it.role);
        postForm({ items }).then(() => {
            if (onContinue !== null) {
                onContinue();
            }
        });
    }, [creatingItems, setCreatingItems, postForm, onContinue]);

    const addCreatingItems = useCallback(() => {
        setCreatingItems([...creatingItems, { email: '', role: 'user' }]);
    }, [creatingItems, setCreatingItems]);

    const changeEmail = useCallback(
        (index, email) => {
            setCreatingItems(creatingItems.map((it, i) => (i === index ? { ...it, email } : it)));
        },
        [creatingItems, setCreatingItems],
    );

    const changeRole = useCallback(
        (index, role) => {
            setCreatingItems(creatingItems.map((it, i) => (i === index ? { ...it, role } : it)));
        },
        [creatingItems, setCreatingItems],
    );

    return (
        <div
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="d-flex flex-column justify-content-between">
                <div className="items">
                    {creatingItems.map(({ email, role }, index) => (
                        <div className="d-flex w-100 my-1" key={`member-${index + 1}`}>
                            <div className="d-flex w-100 my-1">
                                <TextField
                                    className="flex-fill"
                                    value={email}
                                    onChange={(val) => {
                                        changeEmail(index, val);
                                    }}
                                />
                            </div>
                            <Select
                                className="ml-4 w-25"
                                value={role}
                                onChange={(val) => {
                                    changeRole(index, val);
                                }}
                                options={roles}
                            />
                        </div>
                    ))}
                    <div className="d-flex w-100 my-1">
                        <AddButton className="my-0" onClick={addCreatingItems} />
                    </div>
                </div>
                <hr />
                <Button className="btn btn-primary" onClick={onSubmit}>
                    <FormattedMessage
                        defaultMessage="Continue"
                        description="Continue form button"
                    />
                </Button>
            </div>
        </div>
    );
};

OrganisationInviteForm.propTypes = propTypes;
OrganisationInviteForm.defaultProps = defaultProps;

export default OrganisationInviteForm;
