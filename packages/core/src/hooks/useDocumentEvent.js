import EventsManager from '../lib/EventsManager';
import createUseEvent from '../utils/createUseEvent';

const eventsManager = new EventsManager(document);
const useDocumentEvent = createUseEvent(eventsManager);

export default useDocumentEvent;
