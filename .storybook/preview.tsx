import "../src/app/lib/pdf";
import "../src/app/styles/main.css";
import type { Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default preview;
