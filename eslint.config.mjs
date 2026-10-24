import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals"),
    {
        rules: {
            // Enforce accessible labels on interactive elements
            "jsx-a11y/label-has-associated-control": "warn",
            // Disallow unused variables (errors are likely bugs)
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },
];

export default eslintConfig;
