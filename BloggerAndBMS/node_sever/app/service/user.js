'use strict';
const Service = require('egg').Service;
var md5 = require('md5-node')
class UserService extends Service {
    // 账户添加
    async createUser(body) {
        try {
            let user = {
                username: body.username,
                password: md5(body.password),
            }
            await this.app.model.User.create(user);
            return true;
        } catch (error) {
            return false;
        }
    }

    // 删除账号
    async deleteUser(id) {
        try {
            await this.app.model.User.destory({ where: { id } });
            return true;
        } catch (error) {
            return false;
        }
    }

    //修改密码
    async resetPassword(id, password) {
        try {
            await this.app.model.User.update({
                password: md5(password)
            }, { where: { id } })
            return true;
        } catch (error) {
            return false;
        }
    }

    // 查看所有账号
    async getUserList() {
        try {
            const userList = await this.app.model.User.findAll();
            return userList;
        } catch (error) {
            return null;
        }
    }

    // 登录账号
    async loginUser(username, password) {
        try {
            let passwordMd5 = md5(password);
            const user = await this.app.model.User.findOne({ where: { username } });
            if (user) {
                let psd = user.dataValues.password;
                let usr = user.dataValues.username;
                if (username === usr && passwordMd5 === psd) {
                    const token = this.app.jwt.sign({ username }, this.app.config.jwt.secret);
                    return token;
                } else { return null; }
            } else { return null; }
        } catch (error) {
            return null;
        }
    }

}
module.exports = UserService;