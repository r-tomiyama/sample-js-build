const path = require('path');

module.exports = {
  entry: './index.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
    filename: 'prod.js',
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
