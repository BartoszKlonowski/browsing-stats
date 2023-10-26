const path = require("path");

module.exports = {
    entry: {
        "src/popup/Popup": "./platforms/chromium/app/src/popup/Popup.js",
        "src/engine/Background": "./platforms/chromium/app/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "app"),
    },
};
