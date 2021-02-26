import FieldWithForm from '../components/FieldWithForm';

export default {
    id: 'item-text-style',
    component: FieldWithForm,
    labelPath: 'style.color',
    fields: [
        {
            name: 'style',
            type: 'text-style',
        },
    ]
};
