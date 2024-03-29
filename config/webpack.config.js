// webpack.config.js

const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const vueLoaderConfig = require('./vue-loader.conf');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {getEntry, getHtmlTemplate} = require("./util");
console.log(path.resolve(__dirname,'../src/assets/css/color.scss'))
module.exports = {
    mode: "development",
    stats: "errors-only",
    entry: getEntry(),//定义入口文件
    output: {
        filename: 'js/[contenthash].js',//定义输出文件名称
        path: path.resolve(__dirname, '../dist'),//定义输出文件路径
        assetModuleFilename: "public/[hash][ext]",
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
        port: 8001,//定义端口号
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
            {test: /\.less$/, use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader", "sass-loader"]},
            {
                test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader,"css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap:false
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname,'../src/assets/css/color.scss')
                        }
                    }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            //图片等文件加载
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename:"image/[name].[ext]"
                }
            },
            //字体资源
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename:"font/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        /* new htmlWebpackPlugin(),//配置此插件会自动生成一个index.html并且自动引入bundle.js从而我们无需关心bundle.js的路径问题。*/
        ...getHtmlTemplate(),
        new MiniCssExtractPlugin({
            filename: "public/css/[name].[contenthash].css",
            ignoreOrder: true
        }),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true
        })
    ]
};
