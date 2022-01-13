const fse = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

module.exports = async function (ctx, next) {
    let result;
    if (ctx.path === '/index.html') {
        result = await fse.readFile(ctx.realPath, { encoding: 'utf-8' });
        result = result.replace(
            "<script ", `
            <script>
              window.process = { env: { NODE_ENV: 'dev'} }
            </script>
            <script `
             );
    } else {
        result = fse.createReadStream(ctx.realPath);
    }
    const contentType = mime.contentType(path.extname(ctx.realPath));
    ctx.type = contentType;
    ctx.body = result;
}
