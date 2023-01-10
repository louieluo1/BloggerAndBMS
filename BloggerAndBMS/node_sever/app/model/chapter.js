module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const Chapter = app.model.define('chapter', {
        title: STRING,
        orderby: INTEGER,
    });
    Chapter.associate = function() {
        app.model.Chapter.belongTo(app.model.Book, {
            foreignkey: 'book_id',
            as: 'book',
        });
    };
    return Chapter;
}