const { isJSRequest } = require('../utils/utils.js');
const plugins = require('../plugins');
const mime = require('mime-types');

module.exports = async function (ctx, next) {
    if (isJSRequest(ctx.url)) {
        const result = await plugins(ctx);
        ctx.type = mime.contentType('.js');
        ctx.body = result;
    } else {
        await next();
    }
}