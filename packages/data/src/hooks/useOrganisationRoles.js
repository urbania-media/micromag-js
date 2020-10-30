const useOrganisationRoles = () => {
    const roles = [
        {
            label: 'Administrator',
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
