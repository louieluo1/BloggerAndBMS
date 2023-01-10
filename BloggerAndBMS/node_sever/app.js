module.exports = app => {
    app.beforestart(async function() {
        // 开发环境使用，会删除数据表
        // await app.module.asyn({ force: true });
        // sync方法会根据模型区创建表
        await app.module.sync({});
    });
};