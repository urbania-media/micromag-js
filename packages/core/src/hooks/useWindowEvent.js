import EventsManager from '../lib/EventsManager';
import { createUseEvent } from '../utils';

const eventsManager = new EventsManager(window);
const useWindowEvent = createUseEvent(eventsManager);

export default useWindowEvent;
