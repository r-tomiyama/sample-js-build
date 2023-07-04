const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
    filename: 'dev.js',
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "corejs": 3,
                  useBuiltIns: "usage",
                },
              ],
              [
                "@babel/preset-typescript",
              ]
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
