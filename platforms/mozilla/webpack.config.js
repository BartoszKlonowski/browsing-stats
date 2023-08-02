const path = require("path");

module.exports = {
    entry: {
        "src/popup/Popup": "./platforms/mozilla/app/src/popup/Popup.js",
        "src/engine/Background": "./platforms/mozilla/app/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "app"),
    },
};
