'use strict'
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
    ? 'static'
    : true
const cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            /* return ExtractTextPlugin.extract({
               use: loaders,
               fallback: 'vue-style-loader'
             })*/
            return [MiniCssExtractPlugin.loader].concat(loaders)
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass').concat(
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        path.resolve(__dirname, '../src/assets/css/global.scss'),
                        path.resolve(__dirname, '../src/assets/css/color.scss')] //路径为个人的scss文件路径请自行修改
                }
            }
        ),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}
module.exports = {
    loaders: cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: false
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: true,
    runtimeCompiler: true,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
