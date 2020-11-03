const useOrganisationRoles = () => {
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
