module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    parser: "babel-eslint",
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "prop-types": [0],
        "react/prop-types": [0]
    }
};