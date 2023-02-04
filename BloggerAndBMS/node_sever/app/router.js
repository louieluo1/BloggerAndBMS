'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    // 网页
    router.get('/', controller.home.index);
    router.get('/blog', controller.blog.getBlogList);
    router.get('/blog/:id', controller.blog.getBlogDetail);
    router.get('/video', controller.video.getVideoList);
    router.get('/video/:id', controller.video.getVideoDetail);
    router.get('/resource', controller.resource.getResourceList);
    router.get('/book', controller.book.getBookList);
    router.get('/book/:id', controller.book.toFirstSection);
    router.get('/section/:id', controller.section.getSectionDetail);

    // 后台功能接口
    router.post('api/login', controller.admin.login);
    router.get('/admin', controller.admin.index);
    //  app.resources('routerName', 'pathMatch', controller),例如： router.resources('posts', '/api/posts', controller.posts);
    router.resources('book', 'api/book', app.middleware.checktoken(), controller.book);
    router.resources('chapter', '/api/chapter', app.middleware.checktoken(), controller.chapter);
    router.resources('section', '/api/section', app.middleware.checktoken(), controller.section);
    router.resources('user', '/api/user', app.middleware.checktoken(), controller.user);
    router.resources('blog', '/api/blog', controller.blog);
    router.resources('video', '/api/video', app.middleware.checktoken(), controller.video);
    router.resources('resources', '/api/resource', app.middleware.checktoken(), controller.resource);
    router.post('/api/upload', controller.upload.index);
};