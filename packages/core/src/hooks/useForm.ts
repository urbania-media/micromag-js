import { useForm as useBaseForm } from '@folklore/forms';

function useForm({ fields: providedFields = [], injectInFields = false, ...opts } = {}) {
    const fieldsNames = providedFields.length > 0 ? providedFields.map(({ name }) => name) : [];
    const { fields, ...form } = useBaseForm({
        fields: fieldsNames,
        ...opts,
    });
    return {
        ...form,
        fields: injectInFields
            ? providedFields.map((it) => ({
                  ...it,
                  ...(fields[it.name] || null),
              }))
            : providedFields,
    };
}

export default useForm;
