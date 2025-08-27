import { RouterProvider } from "react-router";

import { queryClient } from "@/app/lib/query";

import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
