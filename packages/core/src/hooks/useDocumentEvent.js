import EventsManager from '../lib/EventsManager';
import { createUseEvent } from '../utils';

const eventsManager = new EventsManager(document);
const useDocumentEvent = createUseEvent(eventsManager);

export default useDocumentEvent;
