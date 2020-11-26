import { useCallback, useState } from 'react';

const useContributions = ({ onContributionSubmitted = null } = {}) => {

    // @TODO get actual contributions
    const [contributions, setContributions] = useState(
        [...new Array(10)].map((el, i) => ({
            name: `Nom ${i + 1}`,
            message: `Message ${i + 1}`,
        })),
    );

    const submit = useCallback(
        (contribution) => {
            const onSubmitSuccess = () => {
                setContributions([contribution, ...contributions]);
                if (onContributionSubmitted !== null) {
                    onContributionSubmitted();
                }
            };
            // @TODO send actual contribution
            setTimeout(onSubmitSuccess, 1000);
        },
        [contributions, setContributions, onContributionSubmitted],
    );

    return {
        contributions,
        submit,
    };
};

export default useContributions;
