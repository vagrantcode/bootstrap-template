const glob = require('glob');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 多页入口
function getEntry() {
    const entry = {};
    glob.sync('./src/pages/**/index.js').forEach((file) => {
        const name = file.match(/\/pages\/(.+)\/index.js/)[1];
        entry[name] = file;
    });
    return entry;
}

// 多页模板
function getHtmlTemplate() {
    return glob
        .sync('./src/pages/**/index.js')
        .map((file) => {
            return {name: file.match(/\/pages\/(.+)\/index.js/)[1], path: file};
        })
        .map(
            (template) =>
                new HtmlWebpackPlugin({
                    chunks: [template.name.toString()],
                    filename: `${template.name}.html`,
                    title: template.name
                })
        );
}

/**
 * 样式引用问题
 * */
function getCssTemplate() {
    return glob
        .sync('./src/pages/**/index.js')
        .map((file) => {
            return {name: file.match(/\/pages\/(.+)\/index.js/)[1], path: file};
        })
        .map(
            (template) =>
                new MiniCssExtractPlugin({
                    filename: `css/${template.name.toString()}.css`
                })
        );

}

module.exports = {
    getEntry,
    getHtmlTemplate,
    getCssTemplate
}
