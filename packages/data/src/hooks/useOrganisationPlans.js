const useOrganisationPlans = () => {
    // TODO: get this from back-end
    const plans = [
        {
            label: 'Starter',
            value: 'starter',
            prices: {
                monthly: 10,
                yearly: 99.95,
            },
            features: {
                users: 2,
                storage: 10,
                data: [],
                delivery: [],
            },
        },
        {
            label: 'Team',
            value: 'team',
            prices: {
                monthly: 20,
                yearly: 149.95,
            },
            features: {
                users: 20,
                storage: 100,
                data: ['analytics'],
                delivery: ['monetisation'],
            },
        },
        {
            label: 'Enterprise',
            value: 'enterprise',
            prices: {
                monthly: 100,
                yearly: 999.95,
            },
            features: {
                users: 100,
                storage: 1000,
                data: ['analytics'],
                delivery: ['monetisation'],
            },
        },
        {
            label: 'Custom',
            value: 'custom',
            prices: {
                monthly: null,
                yearly: null,
            },
            features: {
                contact_us: true,
            },
        },
    ];
    return { plans };
};

export default useOrganisationPlans;
