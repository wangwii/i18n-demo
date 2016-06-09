var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

var isProd = JSON.parse(process.env.BUILD_PROD || 'false');
var outputPath = process.env.OUTPUT_PATH;
module.exports = {
  context: path.join(__dirname, './js'),
  entry: {
    jsx: './index.js',
    vendor: [ 'react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux' ]
  },
  output: {
    filename: 'bundle.js', path: path.join(__dirname, outputPath),
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(!isProd),
        __PROD__: JSON.stringify(isProd),
        'process.env': { NODE_ENV: JSON.stringify(isProd ? 'production' : 'dev') }
    })
  ]
}
