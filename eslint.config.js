// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
    [
        globalIgnores(["dist"]),
        {
            files: ["**/*.{ts,tsx}"],
            extends: [
                js.configs.recommended,
                tseslint.configs.recommended,
                reactHooks.configs["recommended-latest"],
                reactRefresh.configs.vite,
            ],
            languageOptions: {
                ecmaVersion: 2020,
                globals: globals.browser,
            },
            rules: {
                "@typescript-eslint/no-empty-object-type": "off",
                "react-refresh/only-export-components": "off",
            },
        },
    ],
    storybook.configs["flat/recommended"],
);
