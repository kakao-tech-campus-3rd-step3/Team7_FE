import { RouterProvider } from "react-router";

import { queryClient } from "@/app/lib/query";

import { ToastProvider } from "@/shared/lib/toast";
import { Toaster } from "@/shared/ui/toast";

import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <RouterProvider router={router} />
                <Toaster />
            </ToastProvider>
        </QueryClientProvider>
    );
}
