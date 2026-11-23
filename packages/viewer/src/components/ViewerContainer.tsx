import '../styles/styles.global.css';

import { ScreensProvider } from '@micromag/screens';

import ViewerContainerBase, { type ViewerContainerProps } from './ViewerContainerBase';

function ViewerContainer(props: ViewerContainerProps) {
    return <ViewerContainerBase {...props} screensProvider={ScreensProvider} />;
}

export default ViewerContainer;
