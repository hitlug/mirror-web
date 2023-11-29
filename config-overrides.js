const {
  override,
  removeModuleScopePlugin,
  addWebpackPlugin
} = require("customize-cra");

const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackPlugin(
    new copyWebpackPlugin({
      patterns: ["./public/manifest.json"].map(file => ({
        from: file,
        transform: content => {
          return Object.entries(process.env).reduce((text, [key, value]) => {
            let re = new RegExp(`%${key}%`, "g");
            return text.replace(re, value);
          }, content.toString());
        },
        noErrorOnMissing: true
      }))
    })
  )
);
