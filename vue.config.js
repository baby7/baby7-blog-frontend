const path = require('path')
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
        }
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
        loaderOptions: {
            sass: {
                prependData: `@import "theme/styles/global.scss"; @import "src/global.scss";`
            }
        }
    },
}
