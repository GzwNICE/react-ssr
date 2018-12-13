const path = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')
const pxtorem = require('postcss-pxtorem')

const appPackage = require(paths.appPackageJson)

const publicPath = paths.servedPath

const cssFilename = 'static/css/[name].[contenthash:8].css'

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const shouldUseRelativeAssetPaths = publicPath === './'
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

const publicUrl = publicPath.slice(0, -1)
const env = getClientEnvironment(publicUrl)

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

module.exports = {
  context: path.resolve(__dirname, '..'),
  target: 'node',
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: { index: [require.resolve('./polyfills'), paths.appServerIndexJs] },
  output: {
    path: paths.appServerBuild,
    filename: 'static/js/[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx']
  },
  externals: [nodeExternals()],
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appSrc
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 1,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                ['import', { libraryName: 'antd' }],
                'syntax-dynamic-import',
                'dynamic-import-node'
              ],
              presets: ['env', 'react-app']
            }
          },
          // The notation here is somewhat confusing.
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader normally turns CSS into JS modules injecting <style>,
          // but unlike in development configuration, we do something different.
          // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
          // (second argument), then grabs the result CSS and puts it into a
          // separate file in our build process. This way we actually ship
          // a single CSS file in production instead of JS code injecting <style>
          // tags. If you use code splitting, however, any async bundles will still
          // use the "style" loader inside the async code so CSS from them won't be
          // in the main CSS file.
          {
            test: /\.(css|less)$/,
            exclude: [
              paths.appNodeModules,
              path.resolve(paths.appSrc, 'style')
            ],
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: require.resolve('style-loader'),
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                        modules: true,
                        localIdentName: '[hash:base64:7]'
                      }
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9' // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009'
                          }),
                          pxtorem({
                            rootValue: 100,
                            propWhiteList: [],
                          }),
                        ]
                      }
                    }
                  ]
                },
                extractTextPluginOptions
              )
            )
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          {
            test: /\.(css|less)$/,
            include: [
              paths.appNodeModules,
              path.resolve(paths.appSrc, 'style')
            ],
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: require.resolve('style-loader'),
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap
                      }
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9' // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009'
                          }),
                          pxtorem({
                            rootValue: 100,
                            propWhiteList: [],
                          }),
                        ]
                      }
                    }
                  ]
                },
                extractTextPluginOptions
              )
            )
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      },
      {
        test: /\.less$/,
        // include: paths.appSrc,
        use: [
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#FF7214'
              }
            }
          }
        ]
      }
      // {
      //   test: /\.less$/,
      //   // include: paths.appSrc,
      //   use: [
      //     {
      //       loader: require.resolve('less-loader'),
      //       options: {
      //         javascriptEnabled: true,
      //         modifyVars:{
      //           "primary-color":"#FF7214"
      //         }
      //       }
      //     }
      //   ]
      // }
      // {
      //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      //   loader: 'ignore-loader'
      // },
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: require.resolve('babel-loader'),
      //   options: {
      //     plugins: [
      //       ['import', { libraryName: 'antd' }],
      //       'syntax-dynamic-import',
      //       'dynamic-import-node'
      //     ],
      //     presets: ['env', 'react-app']
      //   }
      // },
      // {
      //   test: /\.(css|less)$/,
      //   loader: [
      //     'isomorphic-style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1
      //       }
      //     },
      //     { loader: 'less-loader', options: { javascriptEnabled: true } }
      //   ]
      // }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true
      },
      sourceMap: shouldUseSourceMap
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new webpack.BannerPlugin({
      banner: `****************************************
hash       : [hash]
name       : [name]
file       : [file]
author     : ${appPackage.author}
repository : ${appPackage.repository.url}
****************************************`
    })
  ]
}
