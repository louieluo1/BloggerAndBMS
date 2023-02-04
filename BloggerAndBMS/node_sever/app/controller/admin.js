/* eslint-disable indent */
'use strict';

const Controller = require('egg').Controller;
class LouieluoController extends Controller {
    // 
    async index() {
            await this.ctx.render("admin/index.html");
        }
        // 登录
    async login() {
        try {
            const body = this.ctx.request.body;
            const token = await this.ctx.service.user.login(body.name, body.password);
            if (token) {
                this.ctx.body = {
                    code: 20000,
                    message: true,
                    token: token,
                }
            } else {
                this.ctx.body = {
                    code: 40000,
                    message: false,
                }
            }
        } catch (error) {
            this.ctx.body = {
                code: 40000,
                message: false,
            }
        }
    }
}
module.exports = LouieluoController;