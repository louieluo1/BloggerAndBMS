'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
class UploadController extends Controller {
    // 上传图片
    async index() {
        try {
            const stream = await this.ctx.getFileStream();
            const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
            const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
            this.ctx.body = {
                code: 20000,
                data: {
                    name: filename,
                    file: `/upload/${filename}` //正式地址
                        // file:`http://127.0.0.1:7001/upload/${filename}`//临时服务器地址
                }
            }
        } catch (error) {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }
}
module.exports = UploadController;