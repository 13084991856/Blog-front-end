module.exports = {
    //publicPath配置成'/aaa/bbb/ccc'， 则需在相应的服务器路径中新建aaa>bbb>ccc的文件夹，然后将打包后的文件放进去
    publicPath: './', //项目首页路径
    // 跨域代理
    //devServer: {},
    //configureWebpack: { externals: 'hls.js' } // 在这配置webpack的externals这个字段
}