const merge = require("webpack-merge");

module.exports = function ({ env }) {
  const common = {
    plugins: {
      "postcss-import": {},
      "postcss-flexbugs-fixes": {},
    },
  };

  if (env === "production") {
    return merge(common, {
      plugins: {
        "cssnano": {
          "zindex": false,
          "reduceIdents": false,
          "discardComments": {
            "removeAll": true,
          },
        },
      },
    })
  }
  return common;
};
