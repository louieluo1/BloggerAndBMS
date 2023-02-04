'use strict';
const Service = require('egg').Service;
// const queryString = require('querystring');
// const crypto = require('crypto');
class WebsiteService extends Service {
    // 首页
    async getHomePageData() {
        try {
            // 书列表
            let bookList = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 博客列表
            let blogList = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 推荐博客
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 推荐视频
            let videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 3 });
            // 标题
            let title = "首页-louieluo博客";


            return {
                bookList,
                blogList,
                videoList,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (error) {
            return null;
        }
    }

    // 电子书列表
    async getBookList() {
        try {
            // 所有书列表
            let bookList = await this.ctx.service.book.getBookList({ page: 1, total: 100 });
            // 推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 推荐博客
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 推荐视频
            let recommendVideo = await this.ctx.service.video.getVideoList({ page: 1, total: 3 });
            // 标题
            let title = "学习手册-louieluo博客";

            return {
                bookList,
                recommendVideo,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (error) {
            return null;
        }
    }

    // 电子书详情
    async getSectionDetail(id) {
        try {
            // 获取所有书籍
            let bookList = await this.ctx.service.book.getBookList({ page: 1, total: 100 });
            // 通过小节id获取内容
            let section = await this.ctx.service.section.getSectionDetail(id);
            // 通过书的id获取这本书的章节目录
            let menu = await this.ctx.service.section.getMenuBySectionId(id);
            let title = section.title + '-louieluo博客';
            return {
                bookList,
                section,
                menu,
                title,
            };
        } catch (error) {
            return null;
        }
    }


    // 博客列表
    async getBlogList() {
        try {
            // 通过query方法获取博客的所有数据
            let blog = await this.ctx.service.blog.getBlogList({ page: 1, total: 100 });
            // 推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 推荐博客
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 标题
            let title = "博客-louieluo博客";

            return {
                blog,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (error) {
            return null;
        }
    }

    // 博客详情
    async getBlogDetail(id) {
        try {
            // 查一篇博客
            let blog = await this.ctx.service.blog.getBlogDetail(id);
            // 推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 推荐博客
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 标题
            let title = blog.title + "-louieluo博客";

            return {
                blog,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (error) {
            return null;
        }
    }

    // 下载列表
    async getResourceList() {
        try {
            // 获取所有资源
            let resourceList = await this.ctx.service.resource.getResourceList({ page: 1, total: 100 });
            // 推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 推荐博客
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 标题
            let title = "资源下载-louieluo博客";

            return {
                resourceList,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (error) {
            return null;
        }
    }

    // 视频列表
    async getVideoList() {
        try {
            // 推荐视频
            let videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 100 });
            // 推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 });
            // 推荐博客
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });
            // 推荐视频
            let recommendVideo = await this.ctx.service.video.getVideoList({ page: 1, total: 100 });
            // 标题
            let title = "视频-louieluo博客";

            return {
                videoList,
                recommendVideo,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (error) {
            return null;
        }
    }

    // 获取视频类别详情
    async getVideoDetail(id) {
        try {
            // 通过视频类别id获取视频类别
            let video = await this.ctx.service.video.getVideoDetail(id)
                // //通过视频类别的id获取这个视频类别的所有视频
            let videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 3 })
                // 标题
            let title = video.title + "-louieluo博客";

            return {
                video,
                videoList,
                title,
            };
        } catch (error) {
            return null;
        }
    }
}
module.exports = WebsiteService;