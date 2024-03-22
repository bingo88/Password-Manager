// module.exports = {
//     // express 项目默认在 3000 端口启动，所以视图层的 vue 框架中需要设置跨域 
//     devServer: {
//         host: 'localhost',
//         port: 8000,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:3000',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     "/api": ""
//                 }
//             }
//         },
//     },
// }