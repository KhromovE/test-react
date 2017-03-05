const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const cssnano = require('cssnano');
const path = require('path');

const DEVELOPMENT_CONFIG = require('./config/webpack.dev');
const PRODUCTION_CONFIG = require('./config/webpack.prod');
const {
  APP_PATH,
  DIST_PATH,
  NODE_MODULES_PATH,
} = require('./config/paths');

const { cssLoader, sassLoader } = require('./config/loaders');

const ENV = process.env.NODE_ENV;
const VALID_ENVIRONMENTS = ['test', 'development', 'production'];

if (!VALID_ENVIRONMENTS.includes(ENV)) {
  throw new Error(`${ENV} is not valid environment!`);
}

const config = {
  development: DEVELOPMENT_CONFIG,
  production: PRODUCTION_CONFIG,
}[ENV];


const COMMON_CONFIG = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-redux',
      'redux-saga',
      'react-router',
      'axios',
      'classnames',
      'react-formal',
      'yup',
      'lodash',
      'semantic-ui-react',
      'semantic-ui-css/semantic.min.css',
    ],
  },

  output: {
    path: DIST_PATH,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_PATH,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        include: NODE_MODULES_PATH,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        include: APP_PATH,
        use: ['style-loader', cssLoader, 'postcss-loader', sassLoader],
      },
      { test: /\.(woff|woff2?|svg|eot|ttf|png|)$/,
        use: 'file-loader',
      },
      // { test: /\.()$/, use: 'url-loader' },
    ],
  },

  resolve: {
    extensions: ['.js', '.sсss'],
    modules: [
      NODE_MODULES_PATH,
      APP_PATH,
    ],
    alias: {
      components: path.resolve(APP_PATH, 'components'),
      config: path.resolve(APP_PATH, 'config'),
      reducers: path.resolve(APP_PATH, 'reducers'),
      assets: path.resolve(APP_PATH, 'assets'),
    },
  },

  performance: {
    hints: false,
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor.*\.js$/,
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          emitWarning: true,
        },
        postcss: [
          cssnano({
            sourcemap: true,
            autoprefixer: {
              add: true,
              remove: true,
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ],
            },
            safe: true,
            discardComments: {
              removeAll: true,
            },
          }),
        ],
      },
    }),
  ],
};

module.exports = webpackMerge.smart(COMMON_CONFIG, config);

