const moduleTtransPlugin = require('./module-trans-plugin.js');
const vuePlugin = require('./vue-plugin.js');
const fse = require('fs-extra');

module.exports = async function(ctx) {
    const plugins = [vuePlugin, moduleTtransPlugin];
    const source = await fse.readFile(ctx.realPath, { encoding: 'utf-8' });
    let result = source;
    for(const plugin of plugins) {
        result = await plugin.transform(ctx, result);
    }
    return result;
};