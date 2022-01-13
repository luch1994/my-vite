const path = require('path')
const fse = require('fs-extra');
module.exports = function (options) {
    // 获取物理路径，如果不存在，会直接抛出异常，koa自动处理
    return async function (ctx, next) {
        if (ctx.path === '/') {
            ctx.path = '/index.html';
        }
        console.log(`request path is ${ctx.path}`);
        ctx.root = options.root;
        let realPath = path.join(options.root, ctx.path);
        let stat;
        try {
            stat = await fse.stat(realPath);
        } catch (error) {
            stat = null;
        }
        if (!stat) {
            realPath = path.join(options.root, './public', ctx.path);
            stat = await fse.stat(realPath);
        }
        ctx.realPath = realPath;
        await next();
    }
}