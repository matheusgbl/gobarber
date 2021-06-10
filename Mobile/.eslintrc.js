module.exports = {
    env: {
        "es6": true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "__DEV__": "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "prettier"
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "prettier/prettier": "error",
        "no-unused-expressions": "off",
        "react-hooks/exhaustive-deps": "warn",
        "no-use-before-define": "off",
        "react/jsx-props-no-spreading": "off",
        "camelcase": "off",
        "react/prop-types": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
        "react/jsx-closing-bracket-location": "off",
        "import/prefer-default-export": "off",
        "import/extensions": [
        "error",
        "ignorePackages",
        {
            "ts": "never",
            "tsx": "never"
        }
        ]
    },
  settings: {
      "import/resolver": {
        "typescript": {}
      }
    }
};
