module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const Section = app.model.define('section', {
        title: STRING,
        orderby: INTEGER,
        md_text: TEXT,
        html_text: TEXT,
    });
    Section.associate = function() {
        app.model.Section.belongTo(app.model.Chapter, {
            foreignkey: 'chapter_id',
            as: 'chapter',
        });
    };
    return Section;
}