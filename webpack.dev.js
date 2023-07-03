const path = require('path');

module.exports = {
  entry: './index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
    filename: 'dev.js',
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
