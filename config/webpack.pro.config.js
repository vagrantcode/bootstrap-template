// webpack.config.js

const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
/*const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");*/
const vueLoaderConfig = require('./vue-loader.conf');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {getCssTemplate} = require("./util");
const {getEntry, getHtmlTemplate} = require("./util");
module.exports = {
    mode: "production",
    stats: "errors-only",
    entry: getEntry(),//定义入口文件
    output: {
        filename: 'js/[contenthash].js',//定义输出文件名称
        path: path.resolve(__dirname, '../dist'),//定义输出文件路径
        publicPath: ""
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        //配置webpack-dev-server（开发环境用的热部署）
        host: "localhost",//定义主机
        port: 8000,//定义端口号
        open: false//定义是否自动打开页面
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {loader: 'babel-loader'} // options 在 .babelrc 定义
        },
            //所有第三方模块的匹配规则
            {test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]},
            // 配置less处理
            {test: /\.less$/, use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader","sass-loader"]},
            {test: /\.scss$/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]},
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            }
        ]
    },
    plugins: [
        /* new htmlWebpackPlugin(),//配置此插件会自动生成一个index.html并且自动引入bundle.js从而我们无需关心bundle.js的路径问题。*/
        ...getHtmlTemplate(),
        new MiniCssExtractPlugin({
            filename:"css/[name].[contenthash].css",
            ignoreOrder:true
        })
        /*       new FriendlyErrorsWebpackPlugin({
                   clearConsole:true
               })*/
    ]
};
