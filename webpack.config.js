var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var browserConfig = {
   entry: './src/browser/index.js',
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'client.bundle.js',
      publicPath: '/'
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['env', 'react']
            }
         }
      ]
   },
   plugins: [
      /** __isBrowser__ (Global variable in the entire application) */
      new webpack.DefinePlugin({
         __isBrowser__: "true"
      })
   ]
}

var serverConfig = {
   entry: './src/server/index.js',
   target: 'node',
   externals: [nodeExternals()],
   output: {
      path: __dirname,
      filename: 'server.bundle.js',
      publicPath: '/'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['env', 'react']
            }
         }
      ]
   },
   plugins: [
      /** __isBrowser__ (Global variable in the entire application) */
      new webpack.DefinePlugin({
         __isBrowser__: "false"
      })
   ]
}

module.exports = [browserConfig, serverConfig]