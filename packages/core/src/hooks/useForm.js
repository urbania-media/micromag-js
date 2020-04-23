import { useMemo } from 'react';
import { useForm as useBaseForm } from '@folklore/forms';

// eslint-disable-next-line
const useForm = ({ fields: providedFields, ...opts } = {}) => {
    const fieldsNames = useMemo(() => providedFields.map(({ name }) => name), [providedFields]);
    const { fields, ...form } = useBaseForm({
        fields: fieldsNames,
        ...opts,
    });
    return {
        ...form,
        fields: providedFields.map(it => ({
            ...it,
            ...(fields[it.name] || null),
        })),
    };
};

export default useForm;
