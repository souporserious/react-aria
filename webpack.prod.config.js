var path = require('path');
var webpack = require('webpack');
var banner = require('./webpack.banner');
var TARGET = process.env.TARGET || null;

var externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  }
};

var config = {
  entry: {
    index: './src/react-aria.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-aria.js',
    sourceMapFilename: 'react-aria.sourcemap.js',
    library: 'ReactARIA',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, loader: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: externals
};

if (TARGET === 'minify') {
  config.output.filename = 'react-aria.min.js';
  config.output.sourceMapFilename = 'react-aria.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactARIA']
    }
  }));
}

module.exports = config;
