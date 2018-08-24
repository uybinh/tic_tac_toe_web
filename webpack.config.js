const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    // default id 'main' if not specified
    main: './src/index.js'
  },
  output: {
    filename: 'assets/[name]-[hash].js',
    path: path.resolve(__dirname, 'docs'),
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: { loader: 'html-loader?minimize=true' }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name]-[hash].min.css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // minify: true
    })
  ]
}