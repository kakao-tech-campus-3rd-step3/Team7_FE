import React from "react";

import { HTTPException } from "@/shared/errors/HTTPExceptions";

export interface HTTPExceptionBoundaryProps {
    children?: React.ReactNode;
    onError?: (code?: number) => React.ReactNode;
}

type ErrorBoundaryState = {
    code?: number;
    hasError: boolean;
};

export class HTTPExceptionBoundary extends React.Component<
    HTTPExceptionBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: HTTPExceptionBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        if (error instanceof HTTPException) {
            return { hasError: true, code: error.code };
        }
        return { hasError: true };
    }

    public componentDidCatch(error: Error) {
        if (error instanceof HTTPException) {
            console.error("HTTPException caught:", error.code, error.message);
        } else {
            console.error("Unknown error caught:", error);
        }
    }

    render() {
        if (this.state.hasError)
            return this.props.onError ? this.props.onError(this.state.code) : null;

        return this.props.children;
    }
}
