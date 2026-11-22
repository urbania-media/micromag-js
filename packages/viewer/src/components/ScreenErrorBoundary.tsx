import React, { Component, ErrorInfo } from 'react';

export interface ScreenErrorInfo {
    componentStack?: string | null;
}

interface ScreenErrorBoundaryProps {
    /** The boundary resets when one of these values changes (ex.: the screen data, the story) */
    resetKeys?: unknown[];
    fallback?: (error: Error) => React.ReactNode;
    onError?: ((error: Error, info: ScreenErrorInfo) => void) | null;
    children?: React.ReactNode;
}

interface ScreenErrorBoundaryState {
    error: Error | null;
    resetKeys: unknown[];
}

export function resetKeysChanged(previous: unknown[] = [], next: unknown[] = []): boolean {
    return (
        previous.length !== next.length || previous.some((value, i) => !Object.is(value, next[i]))
    );
}

/**
 * Catches an error thrown while rendering one screen, so the other screens and the navigation keep
 * working. React has no hook for error boundaries: this is the only class component of the viewer.
 */
class ScreenErrorBoundary extends Component<ScreenErrorBoundaryProps, ScreenErrorBoundaryState> {
    static getDerivedStateFromError(error: unknown): Partial<ScreenErrorBoundaryState> {
        return { error: error instanceof Error ? error : new Error(String(error)) };
    }

    static getDerivedStateFromProps(
        { resetKeys = [] }: ScreenErrorBoundaryProps,
        state: ScreenErrorBoundaryState,
    ): Partial<ScreenErrorBoundaryState> | null {
        if (!resetKeysChanged(state.resetKeys, resetKeys)) {
            return null;
        }
        // New screen or new story: render the children again
        return { error: null, resetKeys };
    }

    constructor(props: ScreenErrorBoundaryProps) {
        super(props);
        const { resetKeys = [] } = props;
        this.state = { error: null, resetKeys };
    }

    componentDidCatch(error: Error, { componentStack = null }: ErrorInfo) {
        const { onError = null } = this.props;
        if (onError !== null) {
            onError(error, { componentStack });
        }
    }

    render() {
        const { error } = this.state;
        const { fallback = null, children = null } = this.props;
        if (error !== null) {
            return fallback !== null ? fallback(error) : null;
        }
        return children;
    }
}

export default ScreenErrorBoundary;
