import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import writeStats from './utils/write-stats';
import startExpress from './utils/start-express';
import { HOST, PORT as PORT_CONFIG } from '../config/env';

const PORT = PORT_CONFIG + 1;

const PUBLIC_PATH = `http://${HOST}:${PORT}/assets/`;

export default {
  server: {
    port: PORT,
    options: {
      publicPath: PUBLIC_PATH,
      hot: true,
      stats: {
        assets: true,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      }
    }
  },
  webpack: {
    devtool: 'source-map',
    entry: {
      app: [
        `webpack-hot-middleware/client?path=//${HOST}:${PORT}/__webpack_hmr`,
        './app/index.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[hash].js',
      chunkFilename: '[hash].js',
      publicPath: PUBLIC_PATH
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
          test: /\.(ico|jpe?g|png|gif|svg|woff|woff2|eot|otf|ttf)(\?v=[0-9].[0-9].[0-9])?$/,
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
        filename: '[chunkhash].css',
        disable: false,
        allChunks: true
      }),

      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),

      function() { this.plugin('done', writeStats); },
      function() { this.plugin('done', startExpress); }
    ],
    resolve: {
      extensions: [ '.js' ],
      modules: [
        'node_modules',
        'app'
      ]
    }
  }
}
