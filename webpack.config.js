const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: ["./src/background/index.js"],
    options: ["./src/options/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        { from: "./src/options/options.html" },
        { from: "./src/styles/background.css" },
        { from: "./src/styles/options.css" },
        {
          from: "icons/*",
          to: path.resolve(__dirname, "dist"),
          context: "src/",
        },
        {
          from: "assets/*",
          to: path.resolve(__dirname, "dist"),
          context: "src/",
        },
      ],
    }),
  ],
};
