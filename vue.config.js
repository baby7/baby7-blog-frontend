const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
const resolve = (dir) => path.join(__dirname, './', dir)
const  Timestamp = new Date().getTime(); //时间戳
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'src': resolve('src'),
                'theme': resolve('theme'),
            }
        },
        output: {
            filename: 'js/[name].'+Timestamp+'.js',
            chunkFilename: 'js/[name].'+Timestamp+'.js'
        },
        plugins: [
            new CompressionPlugin({//gzip压缩配置
                test:/\.js$|\.html$|\.css/,//匹配文件名
                threshold:10240,//对超过10kb的数据进行压缩
                deleteOriginalAssets:false,//是否删除原文件
            }),
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false, // 去掉注释
                    },
                    warnings: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']//移除console
                    }
                }
            })
        ]
    },
    devServer: {
        port: 80,
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/blog': {
                target: 'http://localhost:8080',   //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/blog': ''
                }
            }
        }
    },
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                prependData: `@import "theme/styles/global.scss"; @import "src/global.scss";`
            }
        }
    },
}
