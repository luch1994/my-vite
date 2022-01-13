const parseUrl = require('./middlewares/parseUrl.js');
const handleJs = require('./middlewares/handleJs.js');
const handleError = require('./middlewares/handleError.js');
const handleFile = require('./middlewares/handleFile.js');
module.exports = function(options) {
    console.log(`root is ${options.root}`)
    const Koa = require('koa');

    const app = new Koa();

    app.use(handleError);
    app.use(parseUrl(options));
    app.use(handleJs);
    app.use(handleFile);

    app.listen(options.port);
    console.log(`server is running at http://localhost:${options.port}`)
}