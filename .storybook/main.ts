import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    viteFinal: async (config) => {
        try {
            const { default: tailwindcss } = await import("@tailwindcss/vite");
            config.plugins?.push(tailwindcss());
        } catch (error) {
            console.warn("TailwindCSS Vite plugin could not be loaded:", error);
        }
        return config;
    },
};
export default config;
