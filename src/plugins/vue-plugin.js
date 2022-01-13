const { getScript } = require('../utils/vue-utils.js');
module.exports = {
    transform(ctx, code) {
        if (!ctx.path.endsWith('.vue')) {
            return code;
        }
        return getScript(ctx.realPath);
    }
}