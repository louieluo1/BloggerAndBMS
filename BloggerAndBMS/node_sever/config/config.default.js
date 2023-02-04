const path = require("path");
'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1673056338618_2662';

    // add your middleware config here
    config.middleware = [];
    config.view = {
        defaultViewEngine: 'nunjucks',
        // root: [
        //     path.join(appInfo.baseDir, 'app/view'),
        // ].join(','),
        // mapping: {
        //     '.html': 'nunjucks',
        // },

    };
    config.cors = {
        origin: '*', //允许有跨域访问，注释掉则允许上面白名单访问
        Credential: true, //允许跨域请求携带cookie
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };
    config.jwt = {
        secret: 'louieluo',
    };
    config.sequelize = {
        dialect: 'mysql',
        database: 'louieluo',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        timezone: '+08:00',
    };
    // 跨站请求伪造，做一些安全验证
    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: [
            '*',
        ], //配置白名单
    };
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    //设置静态文件目录
    config.static = {
        prefix: '/', //访问路径
        dir: path.join(appInfo.baseDir, 'app/public'), //设置静态文件目录
    };

    return {
        ...config,
        ...userConfig,
    };
};