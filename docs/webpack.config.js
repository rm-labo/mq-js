/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const cssDeclarationSorter = require('css-declaration-sorter')
const cssMqpacker = require('css-mqpacker')
const mode = process.env.NODE_ENV
const enabledSourceMap = mode === 'development'
const path = require('path')
const publicDirDistPass = path.resolve(__dirname, './')
const publicAssetsDirPath = './dist'

module.exports = {
  mode: mode,
  entry: {
    index: './src/ts/index.ts',
    'main.css': './src/scss/main.scss'
  },
  output: {
    path: publicDirDistPass,
    filename: publicAssetsDirPath + '/js/[name].js'
  },
  devtool: mode === 'development' ? 'source-map' : 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                cssMqpacker({
                  sort: true
                }),
                cssDeclarationSorter({
                  order: 'smacss'
                }),
                require('autoprefixer')({
                  grid: true
                  // browsers: ['last 2 versions']
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap
            }
          }
        ]
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: 'url-loader'
      },

      {
        test: /\.ts/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: publicAssetsDirPath + '/css/[name]'
    })
  ]
}
