// webpack.config.js
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const {getEntry, getHtmlTemplate} = require("./util");
module.exports = {
    mode:"production",
    stats: "errors-only",
    entry: getEntry(),//定义入口文件
    output: {
        filename: 'js/[contenthash].js',//定义输出文件名称
        path: path.resolve(__dirname, '../dist')//定义输出文件路径
    },
    devServer: {
        //配置webpack-dev-server（开发环境用的热部署）
        host: "localhost",//定义主机
        port: 8000,//定义端口号
        open: true//定义是否自动打开页面
    },
    plugins: [
       /* new htmlWebpackPlugin(),//配置此插件会自动生成一个index.html并且自动引入bundle.js从而我们无需关心bundle.js的路径问题。*/
        ...getHtmlTemplate()
    ]
};
