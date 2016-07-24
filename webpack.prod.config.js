var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

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
    { test: /\.(js|jsx)/, loader: 'babel?stage=0' }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'focus-trap': 'focusTrap',
    'focus-group': 'createFocusGroup',
    'no-scroll': 'noScroll',
    'teeny-tap': 'createTapListener'
  },
};

if (TARGET === 'minify') {
  config.output.filename = 'react-aria.min.js';
  config.output.sourceMapFilename = 'react-aria.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'ReactARIA']
    }
  }));
}

module.exports = config;
