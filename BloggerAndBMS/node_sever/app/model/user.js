module.exports = app => {
    const { STRING } = app.Sequelize;
    // sequelize会自动创建主键
    const User = app.model.define('user', {
        username: STRING,
        password: STRING,
    });
    return User;
}