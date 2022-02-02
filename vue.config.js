const CompressionPlugin = require('compression-webpack-plugin')

// We use the compression-webpack-plugin to compress our files to gzip which are naturally hosted by the esp32
// The contenthash's are set to 4 instead of 8 as the esp spiffs have a limit of 32 characters per a file name. 

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin('CompressionPlugin').use(CompressionPlugin)
  },
  // make sure the output files are not > than 32 characters. 
  configureWebpack: config => {
    if(process.env.NODE_ENV === "production") {
      config.output.filename = 'js/[name].[contenthash:4].min.js'
      config.output.chunkFilename = 'js/cv.[contenthash:4].min.js'
    } else {
      config.output.filename = 'js/[name].js'
      config.output.chunkFilename = 'js/[name].js';
    }
  },
    // https://cli.vuejs.org/config/#css-extract
    css: {
      extract: { 
        ignoreOrder: true,
        filename: 'css/[name].[contenthash:4].css',
        chunkFilename: 'css/cv.[contenthash:4].css', 
      },
    },
};
