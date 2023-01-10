module.exports = app => {
    const { STRING } = app.Sequelize;
    const Video = app.module.define('video', {
        title: STRING,
        iframe_url: STRING,
        img: STRING,
    });
    return Video;
}