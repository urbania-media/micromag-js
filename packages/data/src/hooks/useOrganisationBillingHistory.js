const useOrganisationPaymentHistory = () => {
    // TODO: get this from back-end
    const items = [
        {
            id: 1,
            date: '12 janvier 2021',
            type: null,
            amount: 25.0,
            invoice_link: '/downloads/bill1.pdf',
        },
        {
            id: 2,
            date: '13 janvier 2021',
            type: null,
            amount: 35.0,
            invoice_link: '/downloads/bill2.pdf',
        },
        {
            id: 3,
            date: '14 janvier 2021',
            type: null,
            amount: 25.99,
            invoice_link: '/downloads/bill3.pdf',
        },
        {
            id: 4,
            date: '15 janvier 2021',
            type: 'refund',
            amount: 5.05,
            invoice_link: '/downloads/bill4.pdf',
        },
        {
            id: 5,
            date: '16 janvier 2021',
            type: null,
            amount: 25.0,
            invoice_link: '/downloads/bill5.pdf',
        },
    ];
    return { items };
};

export default useOrganisationPaymentHistory;
