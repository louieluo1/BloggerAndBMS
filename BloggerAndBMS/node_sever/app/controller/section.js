'use strict';
const Controller = require('egg').Controller;
const checkAgent = require("../utils/checkAgent");
class SectionController extends Controller {
    // 添加节
    async create() {
        try {
            const body = this.ctx.request.body;
            body.orderby = Number(body.orderby);
            const create = await this.ctx.service.section.createSection(body);
            this.ctx.body = {
                code: 20000,
                message: create
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 删除节
    async destory() {
        try {
            const id = this.ctx.params.id;
            await this.ctx.service.section.deleteSection(id);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 修改节
    async update() {
        try {
            const id = this.ctx.params.id;
            const body = this.ctx.request.body;
            await this.ctx.service.section.updateSection(id, body);
            this.ctx.body = {
                code: 20000,
                message: true

            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 查看节
    async index() {
        try {
            const chapter_id = this.ctx.request.query.chapter_id;
            const sectionList = await this.ctx.service.section.getSectionList(chapter_id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: sectionList
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 查看单的节
    async show() {
        try {
            const id = this.ctx.params.id;
            const section = await this.service.section.getSectionDetail(id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: section
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 获得节的详情
    async getSectionDetail() {
        const id = this.ctx.params.id;
        const ua = checkAgent(this.ctx.request.header["user-agent"]);
        let data = await this.ctx.service.website.getSectionDetail(id);
        if (ua) {
            await this.ctx.render("pc/book_detail.html", data);
        } else {
            await this.ctx.render("phone/book_detail.html", data);
        }
    }
}
module.exports = SectionController;