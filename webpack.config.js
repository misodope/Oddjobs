const path = require ('path');
const webpack = require('webpack');

const BUILD_DIR = path.join(__dirname, '/client/src');
const APP_DIR = path.join(__dirname, '/client/src/components');

module.exports = {
  entry: BUILD_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader',
             query: {
               presets: ['react', 'es2015']
             }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader', options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ],
        include: path.join(__dirname, '/server/imageUploads')
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules', 'react')
    }
  }
};
