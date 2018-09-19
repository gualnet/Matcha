
// IMPORTS
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app_main.js'
  },
  module: {
    rules: [
      // Pre ESLINT
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            // presets: ['env', 'react'],
            overrides: [{
              'files': ['*.config.js', '*.spec.js'],
              'rules': {
                'no-unused-expressions': 'off'
              }
            }]
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })

  ],
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    // compress: true,
    port: 8881
  }
}
