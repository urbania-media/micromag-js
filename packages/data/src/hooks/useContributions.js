import { useCallback, useState } from 'react';

const useContributions = ({ onSubmitSuccess = null } = {}) => {

    // @TODO get actual contributions
    const [contributions, setContributions] = useState(
        [...new Array(10)].map((el, i) => ({
            name: `Nom ${i + 1}`,
            message: `Message ${i + 1}`,
        })),
    );

    const submit = useCallback(
        (contribution) => {
            const onSuccess = () => {
                setContributions([contribution, ...contributions]);
                if (onSubmitSuccess !== null) {
                    onSubmitSuccess();
                }
            };
            // @TODO send actual contribution
            setTimeout(onSuccess, 1000);
        },
        [contributions, setContributions, onSubmitSuccess],
    );

    return {
        contributions,
        submit,
    };
};

export default useContributions;
