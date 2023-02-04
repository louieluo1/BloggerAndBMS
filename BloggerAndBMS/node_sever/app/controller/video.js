'use strict';

const checkAgent = require('../utils/checkAgent');

const Controller = require('egg').Controller;
class VideoController extends Controller {
    // 添加视频
    async create() {
        try {
            const body = this.ctx.request.body;
            await this.ctx.service.video.createVideo(body);
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

    // 删除视频
    async destroy() {
        try {
            const id = this.ctx.params.id;
            await this.ctx.service.video.deleteVideo(id);
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

    // 修改视频
    async update() {
        try {
            const body = this.ctx.request.body;
            const id = this.ctx.params.id;
            const update = await this.ctx.service.video.updateVideo(id, body);
            this.ctx.body = {
                code: 20000,
                message: update
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 展示所有视频
    async index() {
        try {
            const query = await this.ctx.request.query;
            const videoList = await this.ctx.service.video.getVideoList(query);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: videoList
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 获得视频id
    async show() {
        try {
            const id = await this.ctx.params.id;
            const video = await this.ctx.service.video.getVideoById(id);
            this.ctx.body = {
                code: 20000,
                message: true,
                data: video
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

    // 视频列表页面
    async getVideoList() {
        try {
            const { ctx } = this;
            const ua = checkAgent(ctx.request.header["user-agent"]);
            let data = await this.ctx.service.website.getVideoList();
            if (ua) {
                await ctx.render("pc/video.html", data)
            } else {
                await ctx.render("phone/video.html", data);
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


    // 视频详情页面
    async getVideoDetail() {
        try {
            const { ctx } = this;
            const ua = checkAgent(ctx.request.header["user-agent"]);
            const id = this.ctx.params.id;
            let data = await this.ctx.service.website.getVideoDetail(id);
            if (ua) {
                await ctx.render("pc/video_detail.html", data);
            } else {
                await ctx.render("phone/video_detail.html", data);
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
module.exports = VideoController;