'user strict';
const Service = require('egg').Service;
class SectionService extends Service {
    // 添加节
    async createSection(body) {
        try {
            const section = {
                title: body.section,
                orderby: body.orderby,
                md_text: body.md_text,
                html_texy: body.html_text,
            }
            await this.app.model.Section.create(section);
            return true;
        } catch (error) {
            return false;
        }
    }

    // 删除节
    async deleteSection(id) {
        try {
            await this.app.model.Section.destroy({
                where: { id }
            })
            return ture;
        } catch (error) {
            return false;
        }
    }

    // 修改节
    async updateSection(id, { title, orderby, md_text, html_text, chapter_id }) {
        try {
            await this.app.model.Section.update({
                title,
                chapter_id,
                md_text,
                html_text,
                orderby,
            }, { where: { id } })
            return ture;
        } catch (error) {
            return false;
        }
    }

    // 查询所有节
    async getSectionlist(chapter_id) {
        try {
            const sectionList = await this.app.model.Section.findAll({
                'order': [
                    ['order', 'asc']
                ],
                include: [{
                    model: this.app.model.Chapter,
                    as: 'chapter',
                }],
                where: { chapter_id }
            });
            return sectionList;
        } catch (error) {
            return null;
        }
    }


    // 获得节详情
    async getSectionDetail(id) {
        try {
            const section = await this.app.model.Section.findAll({
                where: { id }
            })
            return section
        } catch (error) {
            return null;
        }
    }

    async getMenuSectionId(id) {
        try {
            const section = await this.app.model.Section.finOne({
                where: { id },
                include: {
                    model: this.app.model.Chapter,
                    as: 'chapter',
                    include: {
                        this.app.model.Book,
                        as: 'book',
                    }
                }
            });
            let book_id = section.dataValues.chapter_id.dataValues.Book.dataValues.id;
            const chapters = await this.app.model.Chapter.findAll({
                where: { book_id }
            })
            for (let item of chapters) {
                let chapter_id = item.dataValues.id;
                const sections = await this.app.model.Section.findAll({
                    where: { chapter_id }
                })
                item.dataValues.sectionList = sections;
            }
            return chapters;
        } catch (error) {
            return null;
        }
    }
}
module.exports = SectionService;