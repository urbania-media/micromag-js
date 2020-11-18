/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';
import PublicationServices from '../lists/PublicationServices';
import defaultServices from '../../data/publish-services';

const propTypes = {
    organisation: AppPropTypes.organisation.isRequired,
    services: AppPropTypes.publicationServices,
    className: PropTypes.string,
    onComplete: PropTypes.func,
};

const defaultProps = {
    services: defaultServices,
    className: null,
    onComplete: null,
};

const OrganisationPublishForm = ({ organisation, services, className, onComplete }) => {
    const [publicationValue, setPublicationValue] = useState(null);
    const onClickSave = useCallback(() => {}, []);
    console.log(organisation, onComplete);
    return (
        <form className={className}>
            <PublicationServices
                items={services}
                value={publicationValue}
                onChange={setPublicationValue}
            />
            <div className="d-flex mt-4 align-items-center justify-content-end">
                <Button theme="primary" size="md" onClick={onClickSave}>
                    <FormattedMessage defaultMessage="Save" description="Save button label" />
                </Button>
            </div>
        </form>
    );
};

OrganisationPublishForm.propTypes = propTypes;
OrganisationPublishForm.defaultProps = defaultProps;

export default OrganisationPublishForm;
