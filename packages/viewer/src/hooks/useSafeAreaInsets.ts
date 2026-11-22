import { useSyncExternalStore } from 'react';

export interface SafeAreaInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

const ZERO_SNAPSHOT = '0,0,0,0';

let probe: HTMLElement | null = null;
let subscribers = 0;

function getProbe(): HTMLElement | null {
    if (typeof document === 'undefined' || document.body === null) {
        return null;
    }
    if (probe === null) {
        probe = document.createElement('div');
        probe.setAttribute('aria-hidden', 'true');
        probe.style.cssText = [
            'position:fixed',
            'top:0',
            'left:0',
            'width:0',
            'height:0',
            'visibility:hidden',
            'pointer-events:none',
            'padding-top:env(safe-area-inset-top,0px)',
            'padding-right:env(safe-area-inset-right,0px)',
            'padding-bottom:env(safe-area-inset-bottom,0px)',
            'padding-left:env(safe-area-inset-left,0px)',
        ].join(';');
    }
    if (probe.parentNode === null) {
        document.body.appendChild(probe);
    }
    return probe;
}

export function parseSafeAreaSnapshot(snapshot: string): SafeAreaInsets {
    const [top = 0, right = 0, bottom = 0, left = 0] = snapshot
        .split(',')
        .map((value) => parseFloat(value) || 0);
    return { top, right, bottom, left };
}

// Measured on subscribe and on resize only: rendering (the frame of a tap) never reads the styles
let cachedSnapshot = ZERO_SNAPSHOT;

function measure() {
    const element = probe;
    if (element === null || element.parentNode === null) {
        cachedSnapshot = ZERO_SNAPSHOT;
        return;
    }
    const { paddingTop, paddingRight, paddingBottom, paddingLeft } =
        window.getComputedStyle(element);
    cachedSnapshot = [paddingTop, paddingRight, paddingBottom, paddingLeft]
        .map((value) => parseFloat(value) || 0)
        .join(',');
}

const getSnapshot = () => cachedSnapshot;

function subscribe(callback: () => void) {
    if (getProbe() === null) {
        return () => {};
    }
    subscribers += 1;
    measure();
    const onChange = () => {
        measure();
        callback();
    };
    window.addEventListener('resize', onChange);
    window.addEventListener('orientationchange', onChange);
    return () => {
        window.removeEventListener('resize', onChange);
        window.removeEventListener('orientationchange', onChange);
        subscribers -= 1;
        if (subscribers === 0 && probe !== null && probe.parentNode !== null) {
            probe.parentNode.removeChild(probe);
            cachedSnapshot = ZERO_SNAPSHOT;
        }
    };
}

const subscribeDisabled = () => () => {};
const getZeroSnapshot = () => ZERO_SNAPSHOT;

/**
 * The insets of the system areas (notch, home indicator) when the page uses `viewport-fit=cover`.
 * Zero elsewhere, and when disabled (viewer embedded in a smaller container).
 */
function useSafeAreaInsets({ disabled = false }: { disabled?: boolean } = {}): SafeAreaInsets {
    const snapshot = useSyncExternalStore(
        disabled ? subscribeDisabled : subscribe,
        disabled ? getZeroSnapshot : getSnapshot,
        getZeroSnapshot,
    );
    return parseSafeAreaSnapshot(snapshot);
}

export default useSafeAreaInsets;
