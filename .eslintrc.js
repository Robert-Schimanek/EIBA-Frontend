var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "@vue/airbnb"
    ],
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "rules": {
        "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
        "eol-last": 0,
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
        "no-unused-vars": "off",
        "quotes": "off",
        "no-undef": "off",
        "prefer-const": "off",
        "no-plusplus": "off",

    }
};