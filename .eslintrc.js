module.exports = {
    root: true,

    // parser: 'babel-eslint',
    parser: 'vue-eslint-parser',
    // parser: '@typescript-eslint/parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 6,
        sourceType: 'module',
    },

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended', // /base, /essential, /strongly-recommended, /recommended
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/vue',
        'plugin:prettier/recommended', // turns off all ESLINT rules that are unnecessary due to Prettier or might conflict with Prettier.
    ],

    env: {
        // es6: true,
        node: true,
    },

    rules: {
        'prettier/prettier': 'error',
        // '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-inferrable-types': false,
        '@typescript-eslint/explicit-function-return-type': false,
        '@typescript-eslint/camelcase': false,
        // '@typescript-eslint/no-unused-vars': false,
        '@typescript-eslint/no-explicit-any': false,
        'vue/html-indent': [
            'error',
            4,
            {
                alignAttributesVertically: true,
            },
        ],
        'vue/no-v-html': 'off',
        'vue/no-parsing-error': ['off'],
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
            {
                ignores: [
                    'router-link',
                    'router-view',
                    'error',
                    'splash',
                    'transition',
                    'nav-bar',
                    'modal-answer',
                    'lazy-component',
                ],
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'avoid',
                bracketSpacing: false,
                jsxBracketSameLine: false,
                printWidth: 80,
                proseWrap: 'always',
                semi: false,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
                useTabs: false,
            },
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },

    plugins: ['vue', 'prettier'],

}
