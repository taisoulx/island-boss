const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Vuetify-md-pro-clone/" : "/",
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src"));
  }
};
