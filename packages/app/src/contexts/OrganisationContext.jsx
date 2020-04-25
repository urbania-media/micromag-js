/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as AppPropTypes from '../lib/PropTypes';

const OrganisationContext = React.createContext(null);

export const useOrganisation = () => {
    const { organisation } = useContext(OrganisationContext);
    return organisation;
};
export const useSetOrganisation = () => {
    const { setOrganisation } = useContext(OrganisationContext);
    return setOrganisation;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    organisation: AppPropTypes.organisation,
};

const defaultProps = {
    organisation: null,
};

export const OrganisationProvider = ({ organisation: initialOrganisation, children }) => {
    const [organisation, setOrganisation] = useState(initialOrganisation);
    useEffect(() => {
        if (initialOrganisation !== organisation) {
            setOrganisation(initialOrganisation);
        }
    }, [initialOrganisation]);
    return (
        <OrganisationContext.Provider value={{ organisation, setOrganisation }}>
            {children}
        </OrganisationContext.Provider>
    );
};

OrganisationProvider.propTypes = propTypes;
OrganisationProvider.defaultProps = defaultProps;

export default OrganisationContext;
