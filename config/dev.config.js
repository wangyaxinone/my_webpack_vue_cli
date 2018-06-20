const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin= require('html-webpack-plugin');
const webpack = require('webpack');
const express = require('express')
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        filename:'js/app.js',
        path:path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool:'cheap-module-eval-source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': './src',
      }
    },
    devServer: {
      compress: true,
      port: 9000,
      hot:true,
      proxy: {
        "/api": {
          target:'',
        }
      },
      setup(app){
        app.use('/img',express.static('src/assets/images'));
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
              loader: 'babel-loader',
              options: {
                presets: ['env'],
                plugins: ['transform-runtime']
              }
            }
          },
          {
            test: /\.less$/,
            use: [
              'vue-style-loader',
              { loader: 'css-loader' },
              { 
                loader: 'postcss-loader',
                // options: {
                //   // parser: 'sugarss',
                //   // exec: true,
                //   config:{
                //     path:'config/postcss.config.js' 
                //   }
                // } 
              },
              'less-loader'
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 1000,
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
    plugins: [
      // make sure to include the plugin!
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new htmlWebpackPlugin({
        filename:'index.html',
        template:'./index.html'
      })
    ]
}