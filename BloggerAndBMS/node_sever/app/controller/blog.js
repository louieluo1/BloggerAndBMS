'use strict';
const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkAgent');
class BlogController extends Controller {
    // 添加博客
    async create() {
        try {
            const body = await this.ctx.request.body; //{title,img,md_text,html_text}
            await this.ctx.service.blog.createBlog(body);
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

    // 删除博客
    async destory() {
        try {
            const id = await this.ctx.params.id;
            await this.ctx.service.blog.deleteBlog(id);
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

    // 修改博客
    async update() {
        try {
            const body = await this.ctx.request.body;
            const id = await this.ctx.params.id;
            const blog = await this.ctx.service.blog.updateBlog(id, body);
            this.ctx.body = {
                code: 20000,
                message: blog
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 查看博客
    async index() {
        try {
            const query = await this.ctx.request.query
            const blogList = await this.ctx.service.blog.getBlogList(query);
            this.ctx.body = {
                code: 20000,
                message: blogList
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 查找指定的一篇博客
    async show() {
        try {
            const id = await this.ctx.params.id;
            const blog = await this.ctx.service.blog.getBlogDetail(id);
            this.ctx.body = {
                code: 20000,
                message: blog
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 博客列表页面
    async getBlogList() {
        try {
            const { ctx } = this;
            const ua = checkAgent(ctx.request.header['user-agent']);
            let data = await this.ctx.service.website.getBlogList({
                page: 1,
                total: 100
            })
            if (ua) {
                await ctx.render('pc/blog.html', data);
            } else {
                await ctx.render('phone/blog.html', data);
            }

        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 博客详情页面
    async getBlogDetail() {
        try {
            const { ctx } = this;
            const ua = checkAgent(ctx.request.header['user-agent']);
            //获取博客id
            const id = this.ctx.params.id;
            // 博客详情
            let data = await this.ctx.service.website.getBlogDetail(id);
            if (ua) {
                await ctx.render('pc/blog_detail.html', data);
            } else {
                await ctx.render('phone/blog_detail.html', data);
            }
            // this.ctx.body = {
            //     code: 20000,
            //     message: true
            // }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

}
module.exports = BlogController;