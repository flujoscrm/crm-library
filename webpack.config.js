// webpack.config.js
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: '$',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
