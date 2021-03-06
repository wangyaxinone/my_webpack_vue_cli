const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin= require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        filename:'js/app.js',
        path:path.join(__dirname,'dist')
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
        "/api": "http://localhost:3000"
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
              'css-loader',
              'less-loader'
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000000,
              name: 'img/[name].[hash:7].[ext]'
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