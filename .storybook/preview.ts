import "../src/app/lib/pdf";
import "../src/app/styles/main.css";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
