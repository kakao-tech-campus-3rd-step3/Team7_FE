import React, { Component, type ReactNode } from "react";

import { Button } from "@/shared/ui/button";

export interface QueryErrorBoundaryProps {
    children: ReactNode;
    fallback?: (error: Error, resetError: () => void) => ReactNode;
    onError?: (error: Error) => void;
}

interface QueryErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class QueryErrorBoundary extends Component<
    QueryErrorBoundaryProps,
    QueryErrorBoundaryState
> {
    constructor(props: QueryErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): QueryErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error) {
        this.props.onError?.(error);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError && this.state.error) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.resetError);
            }

            return (
                <div className="flex h-screen items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 text-lg font-medium text-slate-900">
                            서버에서 데이터를 불러오지 못했습니다.
                        </div>
                        <div className="mb-6 text-sm text-slate-600">
                            잠시 후 다시 시도해주세요.
                        </div>
                        <Button onClick={this.resetError} variant="outline">
                            다시 시도
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
