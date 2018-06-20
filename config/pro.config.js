const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin= require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
console.log(__dirname);
module.exports = {
    mode:'production',
    entry:{
        app:'./src/main.js'
    },
    output:{
        filename: 'js/[name]-[chunkhash:6].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    devtool:'nosources-source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': './src',
      }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 1000,//10000000
                  name: 'img/[name].[ext]'
                }
            },
            {
                  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                  }
            },
            {
                  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                  }
            }
        ]
    },
    
    optimization: {
        splitChunks: {
            chunks: "all", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            minSize: 1000,
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            } 
            
        },
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk : {
            name: 'manifest'
        }
    },
    plugins: [
      // make sure to include the plugin!
      //new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css",
            //chunkFilename: "[id].[hash:6].css"
        }),
        new CleanWebpackPlugin(['dist'],{
            root:path.resolve(__dirname, '../'),
            exclude:['img']
        })
        
    ]
}

