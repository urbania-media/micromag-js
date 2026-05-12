import { useSpring, useSpringRef } from '@react-spring/core';
import { useGesture } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';

interface UseDragProgressProps {
    progress: number;
    onTap?: (gestureState) => void;
    disabled?: boolean;
    dragDisabled?: boolean;
    computeProgress?: (gestureState) => number | null;
    onProgress?: (progress: number, gestureState) => void | null;
    onPointerDown?: (gestureState) => void | null;
    onResolve?: (event) => void | null;
    onScroll?: (gestureState) => void | null;
    springParams?: object;
    dragOptions?: object;
}

const defaultDragOptions = {
    filterTaps: true,
};

function useDragProgress({
    progress: wantedProgress,
    onTap = null,
    disabled = false,
    dragDisabled = false,
    computeProgress = null,
    onProgress = null,
    onPointerDown = null,
    onResolve = null,
    onScroll = null,
    springParams = undefined,
    dragOptions = defaultDragOptions,
}: UseDragProgressProps) {
    const draggingRef = useRef(false);
    const progressRef = useRef(wantedProgress);
    // const wantedProgressRef = useRef(wantedProgress);
    // if (wantedProgress !== wantedProgressRef.current) {
    //     wantedProgressRef.current = wantedProgress;
    // }
    const [dragging, setDragging] = useState(false);
    const [direction, setDirection] = useState(0);
    const [transitioned, setTransitioned] = useState(true);
    const onTransitionStart = () => {
        setTransitioned(false);
    };

    const onTransitionComplete = () => {
        setTransitioned(true);
    };

    // In react-spring v10, useSpring(fn) without deps stores the initial update and
    // re-applies it via ctrl.start() in a layout effect on EVERY render, resetting the
    // spring to its initial value. To prevent this, we pass a dummy SpringRef as `ref`
    // in the props — when ctrl.ref is set, the layout effect queues updates instead of
    // starting them, so our imperative api.start() calls are not overridden.
    const imperativeRef = useSpringRef();
    const [{ progress }, api] = useSpring(() => ({
        ref: imperativeRef,
        from: { progress: wantedProgress },
        onStart: onTransitionStart,
        onRest: onTransitionComplete,
        ...springParams,
    }));

    const onDrag = (gestureState) => {
        const { active, tap, first, last } = gestureState;

        if (disabled) {
            draggingRef.current = false;
            return;
        }

        if (tap) {
            draggingRef.current = false;
            if (onTap !== null) onTap(gestureState);
            return;
        }

        if (dragDisabled) {
            draggingRef.current = false;
            return;
        }

        const newProgress = computeProgress(gestureState);
        draggingRef.current = active;
        setDirection(newProgress < wantedProgress ? -1 : 1);
        progressRef.current = newProgress;
        if (active !== dragging) {
            setDragging(active);
        }
        api.start({
            progress: newProgress,
            immediate: active,
            onResolve: (e) => {
                if (!active) {
                    setDirection(0);
                }
                if (onResolve !== null) onResolve(e);
            },
            onStart: first ? onTransitionStart : undefined,
            onRest: last ? onTransitionComplete : undefined,
            ...springParams,
        });
        if (onProgress !== null) {
            onProgress(newProgress, gestureState);
        }
    };

    const bind = useGesture(
        {
            onDrag,
            onPointerDown: onPointerDown !== null ? onPointerDown : undefined,
            onScroll: onScroll !== null ? onScroll : undefined,
        },
        {
            drag: dragOptions,
        },
    );

    const [lastWantedProgress, setLastWantedProgress] = useState(wantedProgress);

    useEffect(() => {
        if (!draggingRef.current && wantedProgress !== progressRef.current) {
            setDirection(wantedProgress < progressRef.current ? -1 : 1);
            setLastWantedProgress(wantedProgress);
            progressRef.current = wantedProgress;
            api.start({
                progress: wantedProgress,
                immediate: disabled,
                onResolve: (e) => {
                    setDirection(0);
                    if (onResolve !== null) onResolve(e);
                },
                onStart: onTransitionStart,
                onRest: onTransitionComplete,
                ...springParams,
            });
        }
    }, [
        api,
        wantedProgress,
        disabled,
        onResolve,
        springParams,
        onTransitionStart,
        onTransitionComplete,
    ]);

    const transitioning = progress.isAnimating || dragging || !transitioned;

    return {
        transitioning,
        bind,
        dragging,
        progress,
        direction:
            wantedProgress !== lastWantedProgress
                ? wantedProgress < lastWantedProgress
                    ? -1
                    : 1
                : direction,
    };
}

export default useDragProgress;
