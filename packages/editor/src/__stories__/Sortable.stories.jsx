import { SortableTree } from '../components/sortable/SortableTree';

export default {
    component: SortableTree,
    title: 'Editor/Sortable',
    decorators: [],
    parameters: {
        intl: true,
    },
};

function SortableContainer({ children }) {
    return <div style={{ width: 200 }}>{children}</div>;
}

export function Sortable() {
    return (
        <SortableContainer>
            <SortableTree />
        </SortableContainer>
    );
}

export function SortableRemoveable() {
    return (
        <SortableContainer>
            <SortableTree removable />
        </SortableContainer>
    );
}
