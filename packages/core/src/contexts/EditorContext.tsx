import {
    ReactNode,
    createContext,
    startTransition,
    use,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { ColorsParser } from '../lib';

import { useFieldsManager } from './FieldsContext';
import { useScreensManager } from './ScreensContext';
import { useStory } from './StoryContext';

export const EditorContext = createContext(null);

export const useEditorContext = () => use(EditorContext);

export const useEditorColors = () => {
    const { colors } = useEditorContext() || {};
    return colors;
};

interface EditorProviderProps {
    children: ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
    const story = useStory();
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();
    const colorsParser = useMemo(
        () =>
            new ColorsParser({
                screensManager,
                fieldsManager,
            }),
        [screensManager, fieldsManager],
    );
    const [colors, setColors] = useState(() => colorsParser.extract(story));

    useEffect(() => {
        startTransition(() => {
            setColors(colorsParser.extract(story));
        });
    }, [colorsParser, story]);

    return <EditorContext value={{ colors }}>{children}</EditorContext>;
}
