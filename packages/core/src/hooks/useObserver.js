import { useEffect, useState, useRef } from 'react';

const buildThresholdArray = () => Array.from(Array(10).keys(), i => i / 10);

const observersCache = new Map();

const getOptionsKey = ({ root = null, rootMargin, threshold = null }) =>
    `root_${root}_rootMargin_${rootMargin || null}_threshold_${threshold}`;

const createObserver = (Observer, options = {}) => {
    let subscribers = [];

    const observer = new Observer(entries => {
        entries.forEach(entry => {
            subscribers.forEach(({ element, callback }) => {
                if (element === entry.target) {
                    callback(entry);
                }
            });
        });
    }, options);

    const unsubscribe = element => {
        subscribers = subscribers.filter(it => it.element !== element);
        if (typeof observer.unobserve === 'undefined') {
            observer.disconnect();
            subscribers.forEach(subscriber => {
                observer.observe(subscriber.element);
            });
            return;
        }
        observer.unobserve(element);
    };

    const subscribe = (element, callback) => {
        const currentSubscriber = subscribers.findIndex(it => it.element === element) || null;
        if (currentSubscriber !== null) {
            unsubscribe(element);
        }
        subscribers.push({
            element,
            callback,
        });
        observer.observe(element);
    };

    return {
        subscribe,
        unsubscribe,
        observer,
    };
};

const getObserver = (Observer, options = {}) => {
    const observerKey = getOptionsKey(options);
    if (!observersCache.has(Observer)) {
        observersCache.set(Observer, {});
    }
    const observers = observersCache.get(Observer);
    if (typeof observers[observerKey] === 'undefined') {
        observers[observerKey] = createObserver(Observer, options);
        observersCache.set(Observer, observers);
    }
    return observers[observerKey];
};

export const useObserver = (Observer, opts = {}, initialEntry = {}, changes = []) => {
    const [entry, setEntry] = useState(initialEntry);
    const nodeRef = useRef(null);

    useEffect(() => {
        const { subscribe, unsubscribe } = getObserver(Observer, opts || {});

        if (nodeRef.current !== null) {
            subscribe(nodeRef.current, newEntry => setEntry(newEntry));
        }
        return () => {
            if (nodeRef.current !== null) {
                unsubscribe(nodeRef.current);
            }
        };
    }, [nodeRef.current, ...Object.values(opts || {}), ...changes]);

    return {
        ref: nodeRef,
        entry,
    };
};

const thresholdArray = buildThresholdArray();

export const useIntersectionObserver = ({
    root = null,
    rootMargin = '0px',
    threshold = thresholdArray,
} = {}, changes = []) => {
    const returnValue = useObserver(
        IntersectionObserver,
        {
            root,
            rootMargin,
            threshold,
        },
        {
            target: null,
            time: null,
            isVisible: false,
            isIntersecting: false,
            intersectionRatio: 0,
            intersectionRect: null,
            boundingClientRect: null,
            rootBounds: null,
        },
        changes,
    );
    return returnValue;
};

export const useResizeObserver = (opts, changes = []) => {
    const returnValue = useObserver(ResizeObserver, opts, {
        contentRect: null,
    }, changes);
    return returnValue;
};
