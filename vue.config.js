module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        //自动转化为http://localhost:8080
        proxy: { //配置跨域
            '/api': {
                target: 'https://imissu.herokuapp.com/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {}
    }
}
