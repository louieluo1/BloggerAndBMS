'use strict';
const Controller = require('egg').Controller;
class ChapterController extends Controller {
    // 添加章
    async create() {
        try {
            const body = this.ctx.request.body;
            body.orderby = Number(body.orderby);
            await this.ctx.service.chapter.creatChapter(body);
            this.ctx.body = {
                code: 20000,
                message: true,
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false,
            }
        }
    }

    // 删除章
    async destory() {
        try {
            const id = this.ctx.params.id;
            await this.ctx.service.chapter.deleteChapter(id);
            this.ctx.body = {
                code: 20000,
                message: true,
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false,
            }
        }
    }

    // 修改章
    async update() {
        try {
            const id = this.ctx.params.id;
            const body = this.ctx.request.body;
            await this.ctx.service.chapter.updateChapter(id, body);
            this.ctx.body = {
                code: 20000,
                message: true,
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false,
            }
        }
    }

    // 查看所有章
    async index() {
        try {
            const book_id = this.ctx.request.query.book_id;
            const chapterList = await this.ctx.service.chapter.getChapterList(book_id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: chapterList,
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false,
                data: '失败'
            }
        }
    }

}
module.exports = ChapterController;