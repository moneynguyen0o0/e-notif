import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack-plugin';
import writeStats from './utils/write-stats';

export default {
  devtool: 'source-map',
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-import')({ addDependencyTo: webpack }),
                    require('postcss-for'),
                    require('postcss-calc'),
                    require('postcss-url')(),
                    require('postcss-mixins'),
                    require('postcss-simple-vars'),
                    require('postcss-nested'),
                    require('precss')(),
                    require('autoprefixer')({ browsers: ['last 4 versions'] })
                  ];
                }
              }
            }
          ]
        })
      }, {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|otf|ttf)(\?v=[0-9].[0-9].[0-9])?$/,
        exclude: /node_modules\/(?!font-awesome)/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[sha512:hash:base64:7].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      disable: false,
      allChunks: true
    }),

    new PurifyCSSPlugin({
      purifyOptions: { info: true, minify: true },
      paths: [
        'app/**/*.js'
      ]
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    function() { this.plugin('done', writeStats); }
  ],
  resolve: {
    extensions: [ '.js' ],
    modules: [
      'node_modules',
      'app'
    ]
  }
}
