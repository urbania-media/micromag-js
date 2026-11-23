import '../styles/styles.lazy.global.css';

import { LazyScreensProvider } from '@micromag/screens/lazy';

import ViewerContainerBase, { type ViewerContainerProps } from './ViewerContainerBase';

/**
 * The viewer with its screens loaded on demand: each screen type of the story (component and CSS)
 * is loaded when the viewer mounts, the current screen and its neighbours first, and the viewer
 * waits for a screen and its neighbours before going to it. Its CSS (`@micromag/viewer/lazy.css`)
 * doesn't include the screens: they bring their own.
 */
function LazyViewerContainer(props: ViewerContainerProps) {
    return <ViewerContainerBase {...props} screensProvider={LazyScreensProvider} />;
}

export default LazyViewerContainer;
