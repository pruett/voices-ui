var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var production = process.env.NODE_ENV === 'production'

// Define base plugins
var plugins = [
  new ExtractTextPlugin('style.css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main',
    children: true,
    minChunks: 2
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'BABEL_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    '__DEVTOOLS__': !production
  })
]

// Augment plugins depending on environment
if (production) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ])
} else {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
}

module.exports = {
  debug: !production,
  devtool: production ? 'source-map' : 'eval',
  entry: production
    ? ['./src/index.jsx']
    : ['webpack-hot-middleware/client', './src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [
          'url?limit=8000',
          'img?minimize&progressive=true'
        ]
      }
    ]
  },
  postcss: [autoprefixer()]
}
