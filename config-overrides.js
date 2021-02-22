const {
  override,
  fixBabelImports,
  removeModuleScopePlugin
} = require("customize-cra");
module.exports = override(
  removeModuleScopePlugin(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
