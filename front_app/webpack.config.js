
// IMPORTS
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app_main.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'
          // options: {
          //   // presets: ['env', 'react'],
          //   overrides: [{
          //     'files': ['*.config.js', '*.spec.js'],
          //     'rules': {
          //       'no-unused-expressions': 'off'
          //     }
          //   }]
          // }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: ['@babel/env', '@babel/react'],
          //   plugins: ['@babel/plugin-proposal-class-properties']
          // }
        }
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.Loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })

  ],
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    // compress: true,
    port: 8881
  }
}
