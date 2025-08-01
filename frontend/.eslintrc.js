module.exports = {
    extends: [
        'react-app',
        'react-app/jest'
    ],
    rules: {
        // Change all error rules to warnings for development
        'no-unused-vars': 'warn',
        'no-useless-escape': 'warn',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'prefer-const': 'warn',
        'no-var': 'warn',

        // React specific warnings
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-unused-prop-types': 'warn',

        // TypeScript warnings (if using TypeScript)
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',

        // Import warnings
        'import/no-unused-modules': 'warn',
        'import/no-unresolved': 'warn',

        // General code quality warnings
        'eqeqeq': 'warn',
        'curly': 'warn',
        'no-eval': 'warn',
        'no-implied-eval': 'warn',
        'no-new-func': 'warn',
        'no-script-url': 'warn'
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}; 