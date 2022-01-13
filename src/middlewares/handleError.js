const path = require('path')
module.exports = async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.status = ctx.status || err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
            realPath: ctx.realPath,
        };
    }
}