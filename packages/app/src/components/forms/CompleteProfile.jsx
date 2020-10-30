/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { Toggle, Text } from '@micromag/fields';
// import { useUrlGenerator } from '@micromag/core/contexts';
import { useAccountUpdate, useOrganisationCreate } from '@micromag/data';
import { useSetOrganisation } from '../../contexts/OrganisationContext';

import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/forms/complete-profile.module.scss';

const propTypes = {
    className: PropTypes.string,
    onContinue: PropTypes.func,
};

const defaultProps = {
    className: null,
    onContinue: null,
};

const CompleteProfileForm = ({ className, onContinue }) => {
    const { user, setUser } = useAuth();
    const setOrganisation = useSetOrganisation();

    const [name, setName] = useState('');
    const [createOrg, setCreateOrg] = useState(false);
    const [orgName, setOrgName] = useState('');
    const complete = !name || (createOrg && !orgName);

    const { update: updateAccount } = useAccountUpdate();
    const postAccount = useCallback((data) => updateAccount(data), [updateAccount]);

    const { create: createOrganisation } = useOrganisationCreate();
    const postOrganisation = useCallback((data) => createOrganisation(data), [createOrganisation]);

    const onClickContinue = useCallback(() => {
        if (name && !createOrg) {
            postAccount({ ...user, name }).then((newUser) => {
                setUser(newUser);
                onContinue(false);
            });
        } else if (name && createOrg && orgName) {
            postAccount({ ...user, name }).then((newUser) => {
                setUser(newUser);
                postOrganisation({ name: orgName }).then((org) => {
                    setOrganisation(org);
                    onContinue(true);
                });
            });
        }
    }, [
        user,
        name,
        createOrg,
        orgName,
        setUser,
        setOrganisation,
        postAccount,
        postOrganisation,
        onContinue,
    ]);

    const onNameChange = useCallback(
        (value) => {
            setName(value);
        },
        [setName],
    );

    const onCreateOrgChange = useCallback(() => {
        setCreateOrg(!createOrg);
    }, [createOrg, setCreateOrg]);

    const onOrgNameChange = useCallback(
        (value) => {
            setOrgName(value);
        },
        [setOrgName],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="form-group">
                <label className="label">
                    <FormattedMessage defaultMessage="Name" description="Name field label label" />
                </label>
                <Text value={name} onChange={onNameChange} />
            </div>
            <hr />
            <div className="form-group form-row w-100 align-items-top">
                <div className="col-auto">
                    <label className="label">
                        <FormattedMessage
                            defaultMessage="Create an organisation"
                            description="Create organisation field label"
                        />
                    </label>
                    <p className={styles.normal}>
                        <FormattedMessage
                            defaultMessage="Organisations make it easier to collaborate with a team on micromags."
                            description="Organisations description field label"
                        />
                    </p>
                </div>
                <div className="col-auto">
                    <Toggle value={createOrg} onChange={onCreateOrgChange} />
                </div>
            </div>
            <hr />
            {createOrg ? (
                <div className="form-group">
                    <label htmlFor="orgName" className="label">
                        <FormattedMessage
                            defaultMessage="Organisation name"
                            description="Organisation name field label"
                        />
                    </label>
                    <Text id="orgName" value={orgName} onChange={onOrgNameChange} />
                </div>
            ) : null}
            <div className="form-group">
                <Button
                    theme="primary"
                    size="md"
                    outline
                    onClick={onClickContinue}
                    disabled={complete}
                    className={classNames({
                        active: true,
                    })}
                >
                    <FormattedMessage
                        defaultMessage="Continue"
                        description="Continue button label"
                    />
                </Button>
            </div>
        </div>
    );
};

CompleteProfileForm.propTypes = propTypes;
CompleteProfileForm.defaultProps = defaultProps;

export default CompleteProfileForm;
