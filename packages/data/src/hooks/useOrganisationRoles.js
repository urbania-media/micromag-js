const useOrganisationRoles = () => {
    // TODO: get this from back-end
    const roles = [
        {
            label: 'Admin',
            value: 'admin',
        },
        {
            label: 'User',
            value: 'user',
        },
    ];
    return { roles };
};

export default useOrganisationRoles;
