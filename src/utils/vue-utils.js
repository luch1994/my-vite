const fse = require('fs-extra');
const compiler = require('vue/compiler-sfc');
const path = require('path');

const getScript = async filepath => {
    const { descriptor, errors } = await getDescriptor(filepath);
    let { code: scriptCode, map } = getScriptCode(descriptor, filepath);
    let { code: templateCode } = getTemplateCode(descriptor);
    scriptCode = compiler.rewriteDefault(
        scriptCode,
        '_sfc_main',
    )

    templateCode = templateCode.replace(
        /\nexport (function|const) (render|ssrRender)/,
        '\n$1 _sfc_$2'
      )

    return `
    ${scriptCode}
    ${templateCode}
    _sfc_main.render = _sfc_render;
    export default _sfc_main;
    `;
}

const getTemplate = async filepath => {
    const { descriptor, errors } = await getDescriptor(filepath);
    const result = getTemplateCode(descriptor);
    return result.code;
}

const getDescriptor = async filepath => {
    const source = await fse.readFile(filepath, { encoding: "utf-8" });
    const filename = path.basename(filepath);
    const { descriptor, errors } = compiler.parse(source, {
        filename: filename,
        sourceMap: true,
    });
    return { descriptor, errors };
}

const getScriptCode = (descriptor, id) => {
    const script = compiler.compileScript(descriptor, {
        sourceMap: true,
        id: id,
    });

    const map = script.map;

    return {
        code: script.content,
        map,
    }
}

const getTemplateCode = descriptor => {
    const result = compiler.compileTemplate({
        source: descriptor.template.content,
        id: descriptor.filename,
    });

    return result;
}

module.exports = {
    getScript,
    getTemplate
}