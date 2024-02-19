const path = require('path');
const webpack = require("webpack");

module.exports = (env) => {
  return {
    entry: './src/background.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@usecase': path.resolve(__dirname, 'src/usecase/'),
        '@service': path.resolve(__dirname, 'src/service/'),
        '@repository': path.resolve(__dirname, 'src/repositorys/'),
        '@presentation': path.resolve(__dirname, 'src/presentation/'),
      },
    },
    output: {
      filename: 'background.js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.app_mode": JSON.stringify(process.env.APP_MODE??env.app_mode),
      })
    ]
  }
};