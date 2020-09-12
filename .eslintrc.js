module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        "plugin:react/recommended",
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    rules: {
        "@typescript-eslint/no-empty-interface": 0,
    }
};