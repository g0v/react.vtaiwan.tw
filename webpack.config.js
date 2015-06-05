var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var plugins = [];
var entries = [ './src/index' ];
var loaders = [ 'babel?stage=0' ];
var paths = require('./paths');

if (/production/.test(process.env.NODE_ENV)) {
    plugins = [
    new ExtractTextPlugin("styles.css"),
    new StaticSiteGeneratorPlugin('bundle.js', []),
    new webpack.optimize.UglifyJsPlugin()];
}
else if (!/staging/.test(process.env.NODE_ENV)) {
    plugins = [ new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin() ];
    entries.push('webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server');
    loaders.unshift('react-hot');

}
module.exports = {
  devtool: 'eval',
  entry: entries,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: loaders,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: (/production/.test(process.env.NODE_ENV))?
          ExtractTextPlugin.extract('style-loader','css-loader') :
          'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  postcss: [
    require('autoprefixer-core')
  ]
};
