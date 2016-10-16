var path = require('path');
var webpack = require('webpack');
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
  },
  'focus-group': {
    root: 'focusGroup',
    commonjs2: 'focus-group',
    commonjs: 'focus-group',
    amd: 'focus-group'
  },
  'focus-trap': {
    root: 'focusTrap',
    commonjs2: 'focus-trap',
    commonjs: 'focus-trap',
    amd: 'focus-trap'
  },
  'no-scroll': {
    root: 'noScroll',
    commonjs2: 'no-scroll',
    commonjs: 'no-scroll',
    amd: 'no-scroll'
  },
  'teeny-tap': {
    root: 'createTapListener',
    commonjs2: 'teeny-tap',
    commonjs: 'teeny-tap',
    amd: 'teeny-tap'
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
  plugins: [],
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
