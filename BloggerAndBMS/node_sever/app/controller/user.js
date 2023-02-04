'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
    // 添加账户
    async create() {
        try {
            const body = this.ctx.request.body;
            await this.ctx.service.user.createUser(body);
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false,
                data: "失败"
            }
        }
    }

    // 删除账户
    async destroy() {
        try {
            const id = this.ctx.params.id;
            await this.ctx.service.user.deleteUser(id);
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

    // 修改密码
    async update() {
        try {
            const body = this.ctx.request.body;
            const id = this.ctx.params.id;
            await this.ctx.service.user.resetPassword(id, body);
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

    // 查看所有账户
    async index() {
        try {
            const userList = await this.ctx.service.user.getUserList();
            this.ctx.body = {
                code: 20000,
                message: true,
                data: userList
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }

}
module.exports = UserController;